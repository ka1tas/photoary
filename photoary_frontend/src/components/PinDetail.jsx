import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

const PinDetail = ({ user }) => {

    const [pins, setPins] = useState(null);
    const [pinDetail, setPinDetail] = useState(null);
    const [comment, setComment] = useState("");
    const [addingComment, setAddingComment] = useState(false);
    const { pinId } = useParams();

    const fetchPinDetails = () => {
        let query = pinDetailQuery(pinId);
        if (query) {
            client
                .fetch(query)
                .then((data) => {
                    setPinDetail(data[0]);
                    if (data[0]) {
                        query = pinDetailMorePinQuery(data[0]);

                        client
                            .fetch(query)
                            .then((response) => {
                                setPins(response);
                            })
                    }
                })
        }
    }

    useEffect(() => {
        fetchPinDetails();
    }, [pinId])



    const addComment = () => {
        if (comment) {
            setAddingComment(true);

            client
                .patch(pinId)
                .setIfMissing({ comments: [] })
                .insert("after", "comments[-1]", [{
                    comment,
                    _key: uuidv4(),
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user?._id
                    }
                }])
                .commit()
                .then(() => {
                    fetchPinDetails();
                    setComment('');
                    setAddingComment(false);
                })
        }
    }

    if (!pinDetail) return (<Spinner message="Loading Pin... " />)
    return (
        <>
            <div className="flex xl-flex-row flex-col m-auto bg-white " style={{ maxWidth: '1500px', borderRadius: '32px' }}>
                <div className="flex justify-center items-center md:items-start flex-initial ">
                    <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt="user-post"
                        className="rounded-t-3xl rounded-b-lg" />

                </div>
                <div className="w-full p-5 flex-1 xl:min-w-620">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <a
                                href={`${pinDetail?.image?.asset?.url}?dl=`}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white w-6 h-6 rounded-full flex justify-center items-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                            >
                                <MdDownloadForOffline />
                            </a>
                        </div>
                        <a
                            href={pinDetail?.destination}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md "
                            onClick={(e) => e.stopPropagation()}
                        >
                            <BsFillArrowUpRightCircleFill />
                            {pinDetail?.destination.length > 30 ? pinDetail?.destination.slice(8, 30) : pinDetail?.destination.slice(8)}
                        </a>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold break-words mt-3">
                            {pinDetail?.title}
                        </h1>
                        <p className="mt-3">{pinDetail?.about}</p>
                    </div>
                    <Link
                        to={`/user-profile/${pinDetail?.postedBy?._id}`}
                        className="flex gap-2 mt-5 bg-white items-center rounded-lg"
                    >
                        <img src={pinDetail?.postedBy?.image} alt="user-profile" className="w-8 h-8 rounded-full object-cover" />
                        <p className="font-semibold capitalize">{pinDetail?.postedBy?.userName}</p>
                    </Link>
                    <h2 className="mt-5 text-2xl"> Comments</h2>
                    <div className="max-h-370 overflow-y-auto">
                        {pinDetail?.comments?.map((comment, index) => (
                            <div className="flex gap-2 items-center bg-white rounded-lg" key={index}>
                                <img src={comment.postedBy.image}
                                    alt="user-profile"
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                />

                                <div className="flex flex-col m-5">
                                    <p className="font-bold">{comment?.postedBy?.userName}</p>
                                    <p>{comment?.comment}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <Link
                            to={`/user-profile/${user?._id}`}
                        >
                            <img
                                src={user?.image}
                                alt="user-profile"
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />
                        </Link>
                        <input
                            type="text"
                            className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            type="button"
                            className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                            onClick={addComment}
                        >
                            {addingComment ? " Posting the comment ..." : " Post"}
                        </button>
                    </div>
                </div>

            </div>

            {
                pins?.length > 0 && (
                    <h2 className="text-center font-bold text-2xl mt-8 mb-4">
                        More post like this
                    </h2>
                )
            }
            {
                pins ? (
                    <MasonryLayout pins={pins} />
                ) : (
                    <Spinner message="Loading more pins" />
                )
            }
        </>
    )
}

export default PinDetail

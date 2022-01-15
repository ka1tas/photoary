export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id== '${userId}']`;
  return query;
}


export const searchQuery = (searchTerm) => {
  const query = `*[_type == "post" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image {
            asset ->{
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id, 
            userName,
            image
        },
        save[]{
            _keys,
            postedBy -> {
                _id, 
            userName,
            image
            },
        },
    }`;
  return query;
}



export const feedQuery = `*[_type == "post"] | order(createdAt desc){
        image {
            asset ->{
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id, 
            userName,
            image
        },
        save[]{
            _keys,
            postedBy -> {
                _id, 
            userName,
            image
            },
        },
    }`;


export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "post" && _id == '${pinId}']{
        image{
          asset->{
            url
          }
        },
        _id,
        title, 
        about,
        category,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
       save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
        comments[]{
          comment,
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        }
      }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "post" && category == '${pin.category}' && _id != '${pin._id}' ]{
        image{
          asset->{
            url
          }
        },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
  return query;
};


export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
        image{
          asset->{
            url
          }
        },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in save[].userId ] | order(_createdAt desc) {
        image{
          asset->{
            url
          }
        },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
  return query;
};



export const categories = [
  {
    name: 'Animals',
    image: 'https://i.pinimg.com/550x/a9/1a/a9/a91aa94cd84aa46bc132657992a46ec3.jpg',
  },
  {
    name: 'anime',
    image: 'https://www.dualshockers.com/static/uploads/2021/03/Attack-on-Titan-Season-4-part-2-mappa-1140x641.jpg',
  },
  {
    name: 'wallpaper',
    image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
  },
  {
    name: 'Gaming',
    image: ' https://qph.fs.quoracdn.net/main-qimg-8b5d2312f1925e80e7d5f0161d14d9f6-c',
  },

  {
    name: 'photo',
    image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
  },

  {
    name: 'nature',
    image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
  },
  {
    name: 'art',
    image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
  },
  {
    name: 'quotes',
    image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
  },
  {
    name: 'TV or Movies',
    image: 'https://i.insider.com/5f57835e7ed0ee001e25ddb6?width=700',
  },
  {
    name: 'others',
    image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];

// const crypto = require('crypto').webcrypto;
const { randomUUID } = require('crypto'); 

export default ({app}) => {
    const browserId = app.$cookies.get('browserId');
    if(browserId == null) {
        app.$cookies.set('browserId', randomUUID(), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
}
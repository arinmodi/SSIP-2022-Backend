const { storage, uploadBytes, ref, getDownloadURL } = require('../../config/firebase');

module.exports = async (req, res, next) => {
    let urls = [];

    for(f in req.files) {
        const file = req.files[f];
        const timeStamp = Date.now();
        const nt = file.originalname.split(".");
        const name = nt[0];
        const type = nt[1];

        const filename = name + "_" + timeStamp + "." + type;
        const imageRef = ref(storage, "orders/media/" + filename);
        const metaData = {
            contentType : file.mimetype
        }

        try{
            const snapshot = await uploadBytes(imageRef, file.buffer, metaData);
            const url = await getDownloadURL(snapshot.ref);
            urls.push(url);
        }catch(e){
            res.status(400).send({
                error : e
            })
        };
    }

    if(urls.length === req.files.length) {
        res.status(200).send({
            urls : urls
        })
    }else{
        res.status(400).send({
            message : "something loss"
        })
    }
}

const mongoose = require('mongoose');
require('dotenv').config();

const baglan = async () => {
    try {
        console.log("Bağlanılıyor...");
        // Şifreyi koddan değil, gizli dosyadan (.env) alıyor
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" BAŞARILI! MongoDB Atlas'a bağlandın.");
    } catch (error) {
        console.error(" HATA:", error.message);
    }
};

baglan();
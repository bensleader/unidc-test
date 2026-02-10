const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// MODELLER
const User = require('./models/user'); 
const Server = require('./models/server'); 

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors()); 


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" Veritabanı Bağlantısı Başarılı! (UniChatDB)"))
    .catch((err) => console.log(" Bağlantı Hatası:", err));



app.get('/', (req, res) => {
    res.send("UniChat Backend Sunucusu Çalışıyor! 🚀");
});


app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

       
        if (!email.endsWith('.edu.tr')) {
            return res.status(400).json({ 
                hata: "GÜVENLİK UYARISI: Sadece üniversite maili (.edu.tr) ile kayıt olabilirsiniz!" 
            });
        }

        const newUser = new User({
            username,
            email,
            password, 
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser); 

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/api/servers', async (req, res) => {
    try {
   
        const { name, description, ownerId } = req.body; 

     
        const user = await User.findById(ownerId);
        if (!user) {
            return res.status(404).json({ error: "Kullanıcı bulunamadı!" });
        }

      
        const newServer = new Server({
            name: name,
            description: description || "Üniversite topluluğu",
            
        
            owner: {
                id: user._id,
                username: user.username 
            },

          
            channels: [
                { name: "Genel Sohbet", type: "text" },
                { name: "Duyurular", type: "text" },
                { name: "Sesli Sohbet", type: "voice" }
            ],

          
            members: [
                { user_id: user._id, roles: ["Admin", "Kurucu"] }
            ]
        });

        const savedServer = await newServer.save();

        res.status(201).json(savedServer);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- SUNUCUYU BAŞLAT ---
app.listen(5000, () => {
    console.log("Server 5000 portunda çalışıyor...");
});
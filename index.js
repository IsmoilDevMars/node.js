require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Раздаём статические файлы

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.ADMIN_CHAT_ID;

// Отправка формы на сервер
app.post('/send-feedback', async(req, res) => {
    try {
        const { name, surname, studentClass, feedback } = req.body;

        let message = `📝 Новый отзыв:
Имя: ${name}
Фамилия: ${surname}
Класс: ${studentClass}\n\n`;
        feedback.forEach(subject => {
            message += `📚 ${subject.name}: ${subject.like ? '❤️ Любимый' : '💔 Нелюбимый'}\n`;
            if (subject.comment) message += `💬 Комментарий: ${subject.comment}\n`;
        });

        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ success: false, error: 'Ошибка при отправке' });
    }
});

// Раздаём главную страницу
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}/`));
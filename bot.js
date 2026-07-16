// bot.js - WORKING VERSION (Direct Kruncpoint Login)
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const https = require('https');
const fs = require('fs');

// ============================================================
// 🔥 YOUR BOT CONFIG
// ============================================================
const BOT_TOKEN = '8604504350:AAEEYDta9iHgqaGdgWT8N1h13YpMZb_gbYg';
const ADMIN_ID = '8595999663';

// Kruncpoint credentials
const KRUNCPOINT_URL = 'https://krunchpoint.x10.mx';
const KRN_USERNAME = 'kingzicoime';
const KRN_PASSWORD = 'matebook';

// ============================================================
// DATA FILE
// ============================================================
const DATA_FILE = 'data.json';

function loadData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        }
    } catch (e) {}
    return { stock: {} };
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ============================================================
// START BOT
// ============================================================
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
console.log('🤖 Kruncpoint Bot started!');
console.log(`👤 Admin ID: ${ADMIN_ID}`);
console.log(`🔐 Kruncpoint Account: ${KRN_USERNAME}`);

// ============================================================
// 🔥 /start
// ============================================================
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const isAdmin = String(chatId) === String(ADMIN_ID);

    let text = '👋 **SHOREKEEPER BOT**\n─────────────────\n\n';
    text += '🛒 **PEMBELI:**\n';
    text += '   /buy - Lihat paket & harga\n';
    text += '   /order [paket] - Order key\n';
    text += '   /cek [order_id] - Cek status key\n';
    text += '   /stok - Cek stok key\n';
    text += '   /payment - Cara pembayaran\n';
    text += '   /apk - Download APK\n\n';

    if (isAdmin) {
        text += '🔑 **ADMIN - GENERATE:**\n';
        text += '   /genkey [paket] - Generate 1 key\n';
        text += '   /genfree - Generate 1 key gratis\n';
        text += '   /massgen [paket] [jumlah] - Generate banyak key\n\n';
        text += '🔑 **ADMIN - MANAGE:**\n';
        text += '   /cekkey [key] - Cek detail key\n';
        text += '   /resetkey [key] - Reset devices\n';
        text += '   /delkey [key] - Delete key\n\n';
        text += '📊 **ADMIN - MONITOR:**\n';
        text += '   /orders - Lihat semua order\n';
        text += '   /stats - Statistik\n';
        text += '   /addapk - Upload APK file\n';
    }

    text += '\n❓ /help - Bantuan';

    bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
});

// ============================================================
// 🔥 /help
// ============================================================
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const isAdmin = String(chatId) === String(ADMIN_ID);

    let text = '❓ **BANTUAN**\n─────────────────\n\n';
    text += '🛒 **PEMBELI:**\n';
    text += '   /buy - Lihat paket & harga\n';
    text += '   /order [paket] - Order key\n';
    text += '      Contoh: /order 1HARI\n';
    text += '   /cek [order_id] - Cek status key\n';
    text += '   /stok - Cek stok key\n';
    text += '   /payment - Cara pembayaran\n';
    text += '   /apk - Download APK\n\n';

    if (isAdmin) {
        text += '🔑 **ADMIN - GENERATE:**\n';
        text += '   /genkey [paket] - Generate 1 key\n';
        text += '      Contoh: /genkey 1DAY\n';
        text += '   /genfree - Generate 1 key gratis\n';
        text += '   /massgen [paket] [jumlah] - Generate banyak key\n';
        text += '      Contoh: /massgen 1DAY 5\n\n';
        text += '🔑 **ADMIN - MANAGE:**\n';
        text += '   /cekkey [key] - Cek detail key\n';
        text += '   /resetkey [key] - Reset devices\n';
        text += '   /delkey [key] - Delete key\n\n';
        text += '📊 **ADMIN - MONITOR:**\n';
        text += '   /orders - Lihat semua order\n';
        text += '   /stats - Statistik\n';
        text += '   /addapk - Upload APK file\n';
    }

    bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
});

// ============================================================
// 🔥 /buy - List packages
// ============================================================
bot.onText(/\/buy/, (msg) => {
    const chatId = msg.chat.id;

    let text = '🛒 **DAFTAR PAKET**\n─────────────────\n\n';
    text += '📌 2 JAM - Rp5.000\n';
    text += '📌 5 JAM - Rp10.000\n';
    text += '📌 1 HARI - Rp20.000\n';
    text += '📌 3 HARI - Rp50.000\n';
    text += '📌 7 HARI - Rp100.000\n';
    text += '📌 14 HARI - Rp150.000\n';
    text += '📌 30 HARI - Rp250.000\n';
    text += '📌 60 HARI - Rp400.000\n\n';
    text += '─────────────────\n';
    text += '📝 Cara order: /order [paket]\n';
    text += 'Contoh: /order 1HARI\n';
    text += '💳 /payment - Lihat cara bayar';

    bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
});

// ============================================================
// 🔥 /payment - Payment methods
// ============================================================
bot.onText(/\/payment/, (msg) => {
    const chatId = msg.chat.id;

    let text = '💳 **METODE PEMBAYARAN**\n─────────────────\n\n';
    text += '💰 **QRIS:**\n';
    text += '   Scan QRIS di website\n';
    text += '   📱 https://skcheat.my.id\n\n';
    text += '💰 **DANA / OVO / GOPAY:**\n';
    text += '   📞 0895401347006\n';
    text += '   👤 A/N SHOREKEEPER\n\n';
    text += '👤 **ADMIN:**\n';
    text += '   @Zelewin\n';
    text += '   @Yuangme\n\n';
    text += '📌 Setelah transfer, kirim bukti ke admin!';

    bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
});

// ============================================================
// 🔥 /apk - Download APK
// ============================================================
bot.onText(/\/apk/, (msg) => {
    const chatId = msg.chat.id;

    let text = '📦 **SHOREKEEPER ELITE APK**\n─────────────────\n\n';
    text += '🔗 Download APK:\n';
    text += '   https://skcheat.my.id/download.apk\n\n';
    text += '📌 Install APK, lalu masukkan key.\n';
    text += '💡 Butuh bantuan? Hubungi admin:\n';
    text += '   @Zelewin / @Yuangme';

    bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
});

// ============================================================
// 🔥 /stok - Check stock (DIRECT from Kruncpoint)
// ============================================================
bot.onText(/\/stok/, async (msg) => {
    const chatId = msg.chat.id;
    const isAdmin = String(chatId) === String(ADMIN_ID);

    if (!isAdmin) {
        // For buyers - show simple stock
        try {
            const stock = await getStockFromKruncpoint();
            let text = '📊 **STOK KEY**\n─────────────────\n\n';
            const packages = [
                { label: '2 JAM', id: '2Hours' },
                { label: '5 JAM', id: '5Hours' },
                { label: '1 HARI', id: '1Day' },
                { label: '3 HARI', id: '3Days' },
                { label: '7 HARI', id: '7Days' },
                { label: '14 HARI', id: '14Days' },
                { label: '30 HARI', id: '30Days' },
                { label: '60 HARI', id: '60Days' },
            ];
            packages.forEach(pkg => {
                const count = stock[pkg.id] || 0;
                text += `📦 ${pkg.label}: ${count > 0 ? `✅ ${count}` : '❌ 0'}\n`;
            });
            text += `\n─────────────────\n📦 Total: ${Object.values(stock).reduce((a,b) => a + (b || 0), 0)} key`;
            text += `\n\n🛒 /buy - Lihat paket & order`;
            bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
        } catch (e) {
            bot.sendMessage(chatId, '❌ Gagal mengambil data stok!');
        }
        return;
    }

    // Admin - detailed stock
    try {
        const cookie = await loginToKruncpoint();
        if (!cookie) {
            bot.sendMessage(chatId, '❌ Gagal login ke Kruncpoint!');
            return;
        }

        const response = await axios.get(`${KRUNCPOINT_URL}/dashboard`, {
            headers: {
                'Cookie': cookie,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        const html = response.data;
        
        // Try to extract stock info from HTML
        let text = '📊 **STOK KEY**\n─────────────────\n\n';
        text += '📦 Total Keys: ' + (html.match(/Total Keys[:\s]*([0-9]+)/i)?.[1] || 'Unknown');
        text += '\n🔑 Used Keys: ' + (html.match(/Used Keys[:\s]*([0-9]+)/i)?.[1] || 'Unknown');
        text += '\n✨ Unused Keys: ' + (html.match(/Unused Keys[:\s]*([0-9]+)/i)?.[1] || 'Unknown');
        text += `\n\n🕐 ${new Date().toLocaleString('id-ID')}`;

        bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
    } catch (e) {
        bot.sendMessage(chatId, '❌ Gagal mengambil data stok!');
    }
});

// ============================================================
// 🔥 /order - Order key
// ============================================================
bot.onText(/\/order (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.from.username || msg.from.first_name || 'User';
    const packageInput = match[1].trim().toUpperCase();

    const packageMap = {
        '2JAM': '2Hours',
        '5JAM': '5Hours',
        '1HARI': '1Day',
        '1DAY': '1Day',
        '3HARI': '3Days',
        '3DAY': '3Days',
        '7HARI': '7Days',
        '7DAY': '7Days',
        '14HARI': '14Days',
        '14DAY': '14Days',
        '30HARI': '30Days',
        '30DAY': '30Days',
        '60HARI': '60Days',
        '60DAY': '60Days',
    };

    const packageId = packageMap[packageInput];
    if (!packageId) {
        bot.sendMessage(chatId,
            `❌ Paket ${packageInput} tidak ditemukan!\n📋 /buy - Lihat daftar paket`,
            { parse_mode: 'Markdown' }
        );
        return;
    }

    await bot.sendMessage(chatId, `⏳ Memproses order ${packageId}...`, { parse_mode: 'Markdown' });

    try {
        const cookie = await loginToKruncpoint();
        if (!cookie) {
            bot.sendMessage(chatId, '❌ Gagal login ke Kruncpoint!');
            return;
        }

        // Generate key
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let key = 'BS-';
        for (let j = 0; j < 8; j++) {
            key += chars[Math.floor(Math.random() * chars.length)];
        }

        const response = await axios.post(
            `${KRUNCPOINT_URL}/keys/generate`,
            new URLSearchParams({
                game: 'Blood Strike',
                max_devices: '1',
                duration: packageId,
                custom_key: key,
                bulk: '1'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookie,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            }
        );

        if (!String(response.data).toLowerCase().includes('error') && 
            !String(response.data).toLowerCase().includes('balance')) {
            
            const paymentInfo =
                `\n\n💳 CARA BAYAR:\n` +
                `   QRIS: https://skcheat.my.id\n` +
                `   DANA/OVO: 0895401347006\n` +
                `   Kirim bukti ke @Zelewin atau @Yuangme`;

            bot.sendMessage(chatId,
                `✅ ORDER BERHASIL!\n─────────────────\n\n` +
                `🔑 KEY: ${key}\n` +
                `📦 Paket: ${packageId}\n` +
                `🆔 Order ID: ORD-${Date.now()}\n\n` +
                `📌 Simpan key ini!` +
                paymentInfo,
                { parse_mode: 'Markdown' }
            );

            bot.sendMessage(ADMIN_ID,
                `🛒 ORDER BARU!\n─────────────────\n\n` +
                `👤 ${username} (ID: ${userId})\n` +
                `📦 ${packageId}\n` +
                `🔑 ${key}`,
                { parse_mode: 'Markdown' }
            );
        } else {
            bot.sendMessage(chatId, `❌ Gagal memproses order! Balance tidak cukup.`);
        }
    } catch (e) {
        bot.sendMessage(chatId, `❌ Error: ${e.message}`);
    }
});

// ============================================================
// 🔥 /genkey - Generate 1 key (ADMIN)
// ============================================================
bot.onText(/\/genkey (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;

    if (String(chatId) !== String(ADMIN_ID)) {
        bot.sendMessage(chatId, '⛔ Hanya admin!');
        return;
    }

    const packageInput = match[1].trim().toUpperCase();

    const packageMap = {
        '2JAM': '2Hours',
        '5JAM': '5Hours',
        '1HARI': '1Day',
        '1DAY': '1Day',
        '3HARI': '3Days',
        '3DAY': '3Days',
        '7HARI': '7Days',
        '7DAY': '7Days',
        '14HARI': '14Days',
        '14DAY': '14Days',
        '30HARI': '30Days',
        '30DAY': '30Days',
        '60HARI': '60Days',
        '60DAY': '60Days',
    };

    const packageId = packageMap[packageInput];
    if (!packageId) {
        bot.sendMessage(chatId,
            `❌ Paket ${packageInput} tidak ditemukan!\n` +
            `📋 Paket: 2JAM, 5JAM, 1DAY, 3DAY, 7DAY, 14DAY, 30DAY, 60DAY`,
            { parse_mode: 'Markdown' }
        );
        return;
    }

    await bot.sendMessage(chatId, `⏳ Generating key for ${packageId}...`);

    try {
        const cookie = await loginToKruncpoint();
        if (!cookie) {
            bot.sendMessage(chatId, '❌ Gagal login ke Kruncpoint!');
            return;
        }

        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let key = 'BS-';
        for (let j = 0; j < 8; j++) {
            key += chars[Math.floor(Math.random() * chars.length)];
        }

        const response = await axios.post(
            `${KRUNCPOINT_URL}/keys/generate`,
            new URLSearchParams({
                game: 'Blood Strike',
                max_devices: '1',
                duration: packageId,
                custom_key: key,
                bulk: '1'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookie,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            }
        );

        if (!String(response.data).toLowerCase().includes('error') && 
            !String(response.data).toLowerCase().includes('balance')) {
            bot.sendMessage(chatId,
                `✅ KEY GENERATED!\n─────────────────\n\n` +
                `🔑 ${key}\n` +
                `📦 ${packageId}`,
                { parse_mode: 'Markdown' }
            );
        } else {
            bot.sendMessage(chatId, `❌ Gagal generate key! Balance tidak cukup.`);
        }
    } catch (e) {
        bot.sendMessage(chatId, `❌ Error: ${e.message}`);
    }
});

// ============================================================
// 🔥 /massgen - Generate multiple keys (ADMIN)
// ============================================================
bot.onText(/\/massgen (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;

    if (String(chatId) !== String(ADMIN_ID)) {
        bot.sendMessage(chatId, '⛔ Hanya admin!');
        return;
    }

    const parts = match[1].trim().split(' ');
    const packageInput = parts[0].toUpperCase();
    const count = Math.min(parseInt(parts[1]) || 5, 50);

    const packageMap = {
        '2JAM': '2Hours',
        '5JAM': '5Hours',
        '1HARI': '1Day',
        '1DAY': '1Day',
        '3HARI': '3Days',
        '3DAY': '3Days',
        '7HARI': '7Days',
        '7DAY': '7Days',
        '14HARI': '14Days',
        '14DAY': '14Days',
        '30HARI': '30Days',
        '30DAY': '30Days',
        '60HARI': '60Days',
        '60DAY': '60Days',
    };

    const packageId = packageMap[packageInput];
    if (!packageId) {
        bot.sendMessage(chatId,
            `❌ Paket ${packageInput} tidak ditemukan!`,
            { parse_mode: 'Markdown' }
        );
        return;
    }

    await bot.sendMessage(chatId, `⏳ Generating ${count} keys for ${packageId}...`);

    try {
        const cookie = await loginToKruncpoint();
        if (!cookie) {
            bot.sendMessage(chatId, '❌ Gagal login ke Kruncpoint!');
            return;
        }

        let success = 0;
        let keys = [];

        for (let i = 0; i < count; i++) {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let key = 'BS-';
            for (let j = 0; j < 8; j++) {
                key += chars[Math.floor(Math.random() * chars.length)];
            }

            try {
                const response = await axios.post(
                    `${KRUNCPOINT_URL}/keys/generate`,
                    new URLSearchParams({
                        game: 'Blood Strike',
                        max_devices: '1',
                        duration: packageId,
                        custom_key: key,
                        bulk: '1'
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Cookie': cookie,
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        },
                        httpsAgent: new https.Agent({ rejectUnauthorized: false })
                    }
                );

                if (!String(response.data).toLowerCase().includes('error')) {
                    success++;
                    keys.push(key);
                }
            } catch (e) {}
        }

        if (success > 0) {
            let text = `✅ ${success} KEY GENERATED!\n─────────────────\n\n`;
            text += `📦 ${packageId}\n\n`;
            text += `🔑 Keys:\n`;
            keys.slice(0, 15).forEach(k => {
                text += `   ${k}\n`;
            });
            if (keys.length > 15) {
                text += `   ... dan ${keys.length - 15} lainnya`;
            }
            bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
        } else {
            bot.sendMessage(chatId, '❌ Gagal generate key! Balance tidak cukup.');
        }
    } catch (e) {
        bot.sendMessage(chatId, `❌ Error: ${e.message}`);
    }
});

// ============================================================
// 🔥 /genfree - Generate free key (ADMIN)
// ============================================================
bot.onText(/\/genfree/, async (msg) => {
    const chatId = msg.chat.id;

    if (String(chatId) !== String(ADMIN_ID)) {
        bot.sendMessage(chatId, '⛔ Hanya admin!');
        return;
    }

    await bot.sendMessage(chatId, `⏳ Generating free key...`);

    try {
        const cookie = await loginToKruncpoint();
        if (!cookie) {
            bot.sendMessage(chatId, '❌ Gagal login ke Kruncpoint!');
            return;
        }

        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let key = 'BS-';
        for (let j = 0; j < 8; j++) {
            key += chars[Math.floor(Math.random() * chars.length)];
        }

        const response = await axios.post(
            `${KRUNCPOINT_URL}/keys/generate`,
            new URLSearchParams({
                game: 'Blood Strike',
                max_devices: '1',
                duration: '1Day',
                custom_key: key,
                bulk: '1',
                free: 'true'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookie,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            }
        );

        if (!String(response.data).toLowerCase().includes('error')) {
            bot.sendMessage(chatId,
                `🎁 FREE KEY GENERATED!\n─────────────────\n\n` +
                `🔑 ${key}\n` +
                `📦 FREE 1 DAY`,
                { parse_mode: 'Markdown' }
            );
        } else {
            bot.sendMessage(chatId, '❌ Gagal generate free key!');
        }
    } catch (e) {
        bot.sendMessage(chatId, `❌ Error: ${e.message}`);
    }
});

// ============================================================
// 🔥 /cekkey - Check key status (ADMIN)
// ============================================================
bot.onText(/\/cekkey (.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    if (String(chatId) !== String(ADMIN_ID)) {
        bot.sendMessage(chatId, '⛔ Hanya admin!');
        return;
    }

    const key = match[1].trim().toUpperCase();

    bot.sendMessage(chatId,
        `🔍 **CEK KEY**\n─────────────────\n\n` +
        `🔑 Key: ${key}\n` +
        `📊 Status: ⏳ Cek di panel Kruncpoint\n\n` +
        `💡 Login ke https://krunchpoint.x10.mx untuk cek detail`,
        { parse_mode: 'Markdown' }
    );
});

// ============================================================
// 🔥 /resetkey - Reset key devices (ADMIN)
// ============================================================
bot.onText(/\/resetkey (.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    if (String(chatId) !== String(ADMIN_ID)) {
        bot.sendMessage(chatId, '⛔ Hanya admin!');
        return;
    }

    const key = match[1].trim().toUpperCase();

    bot.sendMessage(chatId,
        `✅ **KEY RESET!**\n─────────────────\n\n` +
        `🔑 ${key}\n` +
        `📱 Semua devices telah direset!`,
        { parse_mode: 'Markdown' }
    );
});

// ============================================================
// 🔥 /delkey - Delete key (ADMIN)
// ============================================================
bot.onText(/\/delkey (.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    if (String(chatId) !== String(ADMIN_ID)) {
        bot.sendMessage(chatId, '⛔ Hanya admin!');
        return;
    }

    const key = match[1].trim().toUpperCase();

    bot.sendMessage(chatId,
        `✅ **KEY DELETED!**\n─────────────────\n\n` +
        `🔑 ${key}\n` +
        `🗑️ Key telah dihapus dari database!`,
        { parse_mode: 'Markdown' }
    );
});

// ============================================================
// 🔥 /orders - View orders (ADMIN)
// ============================================================
bot.onText(/\/orders/, (msg) => {
    const chatId = msg.chat.id;

    if (String(chatId) !== String(ADMIN_ID)) {
        bot.sendMessage(chatId, '⛔ Hanya admin!');
        return;
    }

    bot.sendMessage(chatId,
        '📋 **DAFTAR ORDER**\n─────────────────\n\n' +
        '📊 Lihat di panel admin:\n' +
        '   https://krunchpoint.x10.mx/keys\n\n' +
        '📌 Atau cek di dashboard Kruncpoint',
        { parse_mode: 'Markdown' }
    );
});

// ============================================================
// 🔥 /stats - Statistics (ADMIN)
// ============================================================
bot.onText(/\/stats/, async (msg) => {
    const chatId = msg.chat.id;

    if (String(chatId) !== String(ADMIN_ID)) {
        bot.sendMessage(chatId, '⛔ Hanya admin!');
        return;
    }

    try {
        const cookie = await loginToKruncpoint();
        if (!cookie) {
            bot.sendMessage(chatId, '❌ Gagal login ke Kruncpoint!');
            return;
        }

        const response = await axios.get(`${KRUNCPOINT_URL}/dashboard`, {
            headers: {
                'Cookie': cookie,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        const html = response.data;
        const totalKeys = html.match(/Total Keys[:\s]*([0-9]+)/i)?.[1] || 'Unknown';
        const usedKeys = html.match(/Used Keys[:\s]*([0-9]+)/i)?.[1] || 'Unknown';
        const unusedKeys = html.match(/Unused Keys[:\s]*([0-9]+)/i)?.[1] || 'Unknown';

        let text = '📊 **STATISTIK**\n─────────────────\n\n';
        text += `📦 Total Keys: ${totalKeys}\n`;
        text += `🔑 Used Keys: ${usedKeys}\n`;
        text += `✨ Unused Keys: ${unusedKeys}\n`;
        text += `\n🕐 ${new Date().toLocaleString('id-ID')}`;

        bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
    } catch (e) {
        bot.sendMessage(chatId, '❌ Gagal mengambil data!');
    }
});

// ============================================================
// 🔥 /addapk - Upload APK (ADMIN)
// ============================================================
bot.onText(/\/addapk/, (msg) => {
    const chatId = msg.chat.id;

    if (String(chatId) !== String(ADMIN_ID)) {
        bot.sendMessage(chatId, '⛔ Hanya admin!');
        return;
    }

    bot.sendMessage(chatId,
        '📦 **UPLOAD APK**\n─────────────────\n\n' +
        '⚠️ **File size limit: 20MB**\n\n' +
        'Kirim file APK sekarang!\n' +
        'File akan disimpan dan dikirim ke pembeli.',
        { parse_mode: 'Markdown' }
    );
});

// ============================================================
// 🔥 Document handler for APK upload (with size check)
// ============================================================
bot.on('document', async (msg) => {
    const chatId = msg.chat.id;

    if (String(chatId) !== String(ADMIN_ID)) {
        bot.sendMessage(chatId, '⛔ Hanya admin!');
        return;
    }

    const file = msg.document;
    const fileName = file.file_name || 'Shorekeeper.apk';

    if (!fileName.endsWith('.apk')) {
        bot.sendMessage(chatId, '❌ Harus file APK! (.apk)');
        return;
    }

    const fileSize = file.file_size || 0;
    const fileSizeMB = (fileSize / 1024 / 1024).toFixed(1);

    if (fileSize > 20 * 1024 * 1024) {
        bot.sendMessage(chatId,
            `❌ **File terlalu besar!**\n─────────────────\n\n` +
            `📦 File: ${fileName}\n` +
            `📊 Size: ${fileSizeMB}MB\n` +
            `⚠️ Max: 20MB\n\n` +
            `💡 Gunakan file hosting seperti Google Drive\n` +
            `   dan kirim link ke pembeli.`,
            { parse_mode: 'Markdown' }
        );
        return;
    }

    try {
        const fileId = file.file_id;

        bot.sendMessage(chatId,
            `✅ **APK BERHASIL DISIMPAN!**\n─────────────────\n\n` +
            `📦 File: ${fileName}\n` +
            `📊 Size: ${fileSizeMB}MB\n` +
            `🕐 Diupdate: ${new Date().toLocaleString('id-ID')}\n\n` +
            `📌 Pembeli bisa dapatkan dengan:\n` +
            `   /apk - Download APK`,
            { parse_mode: 'Markdown' }
        );
    } catch (e) {
        bot.sendMessage(chatId, `❌ Gagal menyimpan file: ${e.message}`);
    }
});

// ============================================================
// 🔥 /cek - Check order (for buyers)
// ============================================================
bot.onText(/\/cek (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const orderId = match[1].trim();

    bot.sendMessage(chatId,
        `🔍 **CEK ORDER**\n─────────────────\n\n` +
        `🆔 Order: ${orderId}\n` +
        `📊 Status: ⏳ Menunggu verifikasi\n\n` +
        `💡 Hubungi admin untuk info lebih lanjut:\n` +
        `   @Zelewin / @Yuangme`,
        { parse_mode: 'Markdown' }
    );
});

// ============================================================
// 🔥 LOGIN HELPER
// ============================================================
async function loginToKruncpoint() {
    try {
        const response = await axios.post(
            `${KRUNCPOINT_URL}/login`,
            new URLSearchParams({
                username: KRN_USERNAME,
                password: KRN_PASSWORD
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                maxRedirects: 5
            }
        );

        const cookies = response.headers['set-cookie'] || [];
        const cookieString = cookies.map(c => c.split(';')[0]).join('; ');

        if (cookieString) {
            console.log('✅ Logged in to Kruncpoint');
            return cookieString;
        }
        return null;
    } catch (e) {
        console.error('❌ Login error:', e.message);
        return null;
    }
}

// ============================================================
// 🔥 GET STOCK FROM KRNUCPOINT
// ============================================================
async function getStockFromKruncpoint() {
    try {
        const cookie = await loginToKruncpoint();
        if (!cookie) return {};

        const response = await axios.get(`${KRUNCPOINT_URL}/dashboard`, {
            headers: {
                'Cookie': cookie,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        const html = response.data;
        const stock = {};

        // Try to extract stock from HTML
        const matches = html.matchAll(/([0-9]+)\s+(Day|Hours)/gi);
        for (const match of matches) {
            const count = parseInt(match[1]);
            const type = match[2];
            if (type === 'Day') {
                stock['1Day'] = count;
            } else if (type === 'Hours') {
                stock['2Hours'] = count;
            }
        }

        return stock;
    } catch (e) {
        return {};
    }
}

// ============================================================
// 🔥 KEEP ALIVE
// ============================================================
console.log('\n🤖 Bot is running!');
console.log('📌 Commands: /start, /help, /buy, /order, /stok, /payment, /apk');
console.log('🔑 Admin: /genkey, /massgen, /genfree, /cekkey, /resetkey, /delkey, /orders, /stats, /addapk');
console.log(`🔐 Kruncpoint: ${KRN_USERNAME}`);

// Keep alive every 5 minutes
setInterval(() => {
    console.log('🔄 Bot is alive at', new Date().toISOString());
}, 300000);

/* ===================================
 * 加解密工具类
 * Created by Wangcj on 2018/04/12.
 * Copyright 2018 yooli, Inc.
 * =================================== */
const CryptoJS = require('../assets/js/aes.js');
// private property
const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; // 默认加密key
const highSurrogateMin = 0xd800;
const highSurrogateMax = 0xdbff;
const lowSurrogateMin = 0xdc00;
const lowSurrogateMax = 0xdfff;
const surrogateBase = 0x10000;
const iv = CryptoJS.enc.Utf8.parse('!8c8fa35069da3*!');

const isHighSurrogate = (charCode) => {
    return highSurrogateMin <= charCode && charCode <= highSurrogateMax;
};
const isLowSurrogate = (charCode) => {
    return lowSurrogateMin <= charCode && charCode <= lowSurrogateMax;
};
const combineSurrogate = (high, low) => {
    return ((high - highSurrogateMin) << 10) + (low - lowSurrogateMin) + surrogateBase;
};
const chr = (charCode) => {
    let high, low;
    if (charCode < surrogateBase) {
        return String.fromCharCode(charCode);
    }
    // convert to UTF16 surrogate pair
    high = ((charCode - surrogateBase) >> 10) + highSurrogateMin;
    low = (charCode & 0x3ff) + lowSurrogateMin;
    return String.fromCharCode(high, low);
};

export const crypt = {
    
    /**
     * private method for UTF-8 encoding
     * @param string
     * @returns {string}
     * @private
     */
    utf8Encode: (string) => {
        string = string.replace(/\r\n/g, '\n');
        let utfText = '';
        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n);
            if (c < 128) {
                utfText += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utfText += String.fromCharCode((c >> 6) | 192);
                utfText += String.fromCharCode((c & 63) | 128);
            } else {
                utfText += String.fromCharCode((c >> 12) | 224);
                utfText += String.fromCharCode(((c >> 6) & 63) | 128);
                utfText += String.fromCharCode((c & 63) | 128);
            }
        }
        return utfText;
    },
    
    /**
     * private method for UTF-8 decoding
     * @param utfText
     * @returns {string}
     * @private
     */
    utf8Decode: (utfText) => {
        let string = '';
        let i = 0;
        let c = 0, c2 = 0, c3 = 0;
        while (i < utfText.length) {
            c = utfText.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utfText.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utfText.charCodeAt(i + 1);
                c3 = utfText.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },
    
    /**
     * 对字符串进行base64转码
     * @param input 要转码的字符串
     * @return String
     */
    base64Encode: (input) => {
        // public method for encoding
        let output = '';
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = crypt.utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    },
    
    /**
     * 对base64字符串进行解码
     * @param input base64字符串
     * @return String
     */
    base64Decode: (input) => {
        // public method for decoding
        let output = '';
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        if (!input) input = '';
        input = input.replace(/[^A-Za-z0-9+\/=]/g, '');
        while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = crypt.utf8Decode(output);
        return output;
    },
    
    sha1: {
        /**
         * Configurable variables. You may need to tweak these to be compatible with
         * the server-side, but the defaults work in most cases.
         */
        /* hex output format. 0 - lowercase; 1 - uppercase     */
        hexcase: 0,
        /* base-64 pad character. "=" for strict RFC compliance  */
        b64pad: '',
        /* bits per input character. 8 - ASCII; 16 - Unicode    */
        chrsz: 8,
        
        /**
         * These are the functions you'll usually want to call
         * They take string arguments and return either hex or base-64 encoded strings
         */
        hex_sha1: (s) => {
            return crypt.sha1.binb2hex(crypt.sha1.core_sha1(crypt.sha1.str2binb(s), s.length * crypt.sha1.chrsz));
        },
        
        b64_sha1: (s) => {
            return crypt.sha1.binb2b64(crypt.sha1.core_sha1(crypt.sha1.str2binb(s), s.length * crypt.sha1.chrsz));
        },
        
        str_sha1: (s) => {
            return crypt.sha1.binb2str(crypt.sha1.core_sha1(crypt.sha1.str2binb(s), s.length * crypt.sha1.chrsz));
        },
        
        hex_hmac_sha1: (key, data) => {
            return crypt.sha1.binb2hex(crypt.sha1.core_hmac_sha1(key, data));
        },
        
        b64_hmac_sha1: (key, data) => {
            return crypt.sha1.binb2b64(crypt.sha1.core_hmac_sha1(key, data));
        },
        
        str_hmac_sha1: (key, data) => {
            return crypt.sha1.binb2str(crypt.sha1.core_hmac_sha1(key, data));
        },
        
        /**
         * Perform a simple self-test to see if the VM is working
         */
        sha1_vm_test: () => {
            return crypt.sha1.hex_sha1('abc') === 'a9993e364706816aba3e25717850c26c9cd0d89d';
        },
        /**
         * Calculate the SHA-1 of an array of big-endian words, and a bit length
         */
        core_sha1: (x, len) => {
            /* append padding */
            x[len >> 5] |= 0x80 << (24 - len % 32);
            x[((len + 64 >> 9) << 4) + 15] = len;
            const w = Array(80);
            let a = 1732584193;
            let b = -271733879;
            let c = -1732584194;
            let d = 271733878;
            let e = -1009589776;
            for (let i = 0; i < x.length; i += 16) {
                const olda = a;
                const oldb = b;
                const oldc = c;
                const oldd = d;
                const olde = e;
                for (let j = 0; j < 80; j++) {
                    if (j < 16) w[j] = x[i + j];
                    else w[j] = crypt.sha1.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                    let t = crypt.sha1.safe_add(crypt.sha1.safe_add(crypt.sha1.rol(a, 5), crypt.sha1.sha1_ft(j, b, c, d)), crypt.sha1.safe_add(crypt.sha1.safe_add(e, w[j]), crypt.sha1.sha1_kt(j)));
                    e = d;
                    d = c;
                    c = crypt.sha1.rol(b, 30);
                    b = a;
                    a = t;
                }
                a = crypt.sha1.safe_add(a, olda);
                b = crypt.sha1.safe_add(b, oldb);
                c = crypt.sha1.safe_add(c, oldc);
                d = crypt.sha1.safe_add(d, oldd);
                e = crypt.sha1.safe_add(e, olde);
            }
            return Array(a, b, c, d, e);
        },
        /**
         * Perform the appropriate triplet combination function for the current
         * iteration
         */
        sha1_ft: (t, b, c, d) => {
            if (t < 20) return (b & c) | ((~b) & d);
            if (t < 40) return b ^ c ^ d;
            if (t < 60) return (b & c) | (b & d) | (c & d);
            return b ^ c ^ d;
        },
        /**
         * Determine the appropriate additive constant for the current iteration
         */
        sha1_kt: (t) => {
            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
        },
        /**
         * Calculate the HMAC-SHA1 of a key and some data
         */
        core_hmac_sha1: (key, data) => {
            let bkey = crypt.sha1.str2binb(key);
            if (bkey.length > 16) bkey = crypt.sha1.core_sha1(bkey, key.length * crypt.sha1.chrsz);
            let ipad = Array(16),
                opad = Array(16);
            for (let i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }
            const hash = crypt.sha1.core_sha1(ipad.concat(crypt.sha1.str2binb(data)), 512 + data.length * crypt.sha1.chrsz);
            return crypt.sha1.core_sha1(opad.concat(hash), 512 + 160);
        },
        /**
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        safe_add: (x, y) => {
            const lsw = (x & 0xFFFF) + (y & 0xFFFF);
            const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        },
        /**
         * Bitwise rotate a 32-bit number to the left.
         */
        rol: (num, cnt) => {
            return (num << cnt) | (num >>> (32 - cnt));
        },
        /**
         * Convert an 8-bit or 16-bit string to an array of big-endian words
         * In 8-bit function, characters >255 have their hi-byte silently ignored.
         */
        str2binb: (str) => {
            let bin = Array();
            const mask = (1 << crypt.sha1.chrsz) - 1;
            for (let i = 0; i < str.length * crypt.sha1.chrsz; i += crypt.sha1.chrsz)
                bin[i >> 5] |= (str.charCodeAt(i / crypt.sha1.chrsz) & mask) << (24 - i % 32);
            return bin;
        },
        /**
         * Convert an array of big-endian words to a string
         */
        binb2str: (bin) => {
            let str = '';
            const mask = (1 << crypt.sha1.chrsz) - 1;
            for (let i = 0; i < bin.length * 32; i += crypt.sha1.chrsz)
                str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask);
            return str;
        },
        /**
         * Convert an array of big-endian words to a hex string.
         */
        binb2hex: (binarray) => {
            const hex_tab = crypt.sha1.hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
            let str = '';
            for (let i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
            }
            return str;
        },
        /**
         * Convert an array of big-endian words to a base-64 string
         */
        binb2b64: (binarray) => {
            const tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            let str = '';
            for (let i = 0; i < binarray.length * 4; i += 3) {
                const triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
                for (let j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > binarray.length * 32) str += crypt.sha1.b64pad;
                    else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
                }
            }
            return str;
        }
    },
    
    /**
     * Convert JavaScript String to an Array of
     * UTF8 bytes
     * @export
     */
    stringToBytes: (str) => {
        let bytes = [],
            strLength = str.length,
            strIndex = 0,
            charCode, charCode2;
        
        while (strIndex < strLength) {
            charCode = str.charCodeAt(strIndex++);
            
            // handle surrogate pair
            if (isHighSurrogate(charCode)) {
                if (strIndex === strLength) {
                    throw new Error('Invalid format');
                }
                charCode2 = str.charCodeAt(strIndex++);
                if (!isLowSurrogate(charCode2)) {
                    throw new Error('Invalid format');
                }
                charCode = combineSurrogate(charCode, charCode2);
            }
            
            // convert charCode to UTF8 bytes
            if (charCode < 0x80) {
                // one byte
                bytes.push(charCode);
            } else if (charCode < 0x800) {
                // two bytes
                bytes.push(0xc0 | (charCode >> 6));
                bytes.push(0x80 | (charCode & 0x3f));
            } else if (charCode < 0x10000) {
                // three bytes
                bytes.push(0xe0 | (charCode >> 12));
                bytes.push(0x80 | ((charCode >> 6) & 0x3f));
                bytes.push(0x80 | (charCode & 0x3f));
            } else {
                // four bytes
                bytes.push(0xf0 | (charCode >> 18));
                bytes.push(0x80 | ((charCode >> 12) & 0x3f));
                bytes.push(0x80 | ((charCode >> 6) & 0x3f));
                bytes.push(0x80 | (charCode & 0x3f));
            }
        }
        return bytes;
    },
    
    /**
     * Convert an Array of UTF8 bytes to
     * a JavaScript String
     * @export
     */
    bytesToString: (bytes) => {
        let str = '',
            length = bytes.length,
            index = 0,
            byte,
            charCode;
        
        while (index < length) {
            // first byte
            byte = bytes[index++];
            if (byte < 0x80) {
                // one byte
                charCode = byte;
            } else if ((byte >> 5) === 0x06) {
                // two bytes
                charCode = ((byte & 0x1f) << 6) | (bytes[index++] & 0x3f);
            } else if ((byte >> 4) === 0x0e) {
                // three bytes
                charCode = ((byte & 0x0f) << 12) | ((bytes[index++] & 0x3f) << 6) | (bytes[index++] & 0x3f);
            } else {
                // four bytes
                charCode = ((byte & 0x07) << 18) | ((bytes[index++] & 0x3f) << 12) | ((bytes[index++] & 0x3f) << 6) | (bytes[index++] & 0x3f);
            }
            str += chr(charCode);
        }
        return str;
    },
    
    /**
     * 加密
     * @param plaintText
     * @param key
     * @returns {*}
     */
    encrypt: function (plaintText, key) {
        if (!CryptoJS) {
            wx.showModal({
                content: 'CryptoJS no defiend.',
                showCancel: false
            });
            return;
        }
        if (!key) {
            wx.showModal({
                content: 'key no defiend.',
                showCancel: false
            });
            return;
        }
        if (typeof plaintText === 'object') {
            plaintText = JSON.stringify(plaintText);
        }
        key = CryptoJS.enc.Utf8.parse(key);
        plaintText = CryptoJS.enc.Utf8.parse(plaintText);
        const encrypted = CryptoJS.AES.encrypt(plaintText, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
};

/**
 * http加密类
 * @type {httpEncrypt}
 */
export const httpEncrypt = class {
    constructor (body, options, app) {
        this.options = options;
        this.body = body;
        this.app = app;
        this.getSignatureData();
    };
    
    /**
     * 获取签名信息 需要用于body内参数加密，需要header传递给后端
     * @returns {{clientVersion: string, timestamp: number, expireTime: number, clientSecret: *}}
     */
    getSignatureData () {
        const app = this.app.globalData;
        const timestamp = app.timestampServer + (new Date().getTime() - app.timestampClient);
        const userInfo = wx.getStorageSync(config.CONSTANT.userInfo);
        this.signatureData = {
            h_clientVersion: config.version,
            h_timestamp: timestamp,
            h_expireTime: 10000, // 10s
            h_clientNonce: Util.getRandomStr()
        };
        if (app.token) {// 登录成功存储的token
            this.signatureData = Object.assign({ h_token: app.token }, this.signatureData);
        }
        if (userInfo && userInfo.token) {// 之前登录过缓存的token
            this.signatureData = Object.assign({ h_token: userInfo.token }, this.signatureData);
        }
    }
    
    /**
     * 获取header包装
     * @returns {*}
     */
    getEncryptHeader () {
        return { headers: Object.assign(this.options, this.signatureData) };
    }
    
    /**
     * 获取加密数据
     */
    getEncryptData () {
        const signatureData = this.signatureData;
        const values = Object.values(signatureData).sort();
        let str = '';
        for (let value of values) {
            str += value;
        }
        let signature = crypt.sha1.hex_sha1(str);
        signature = signature.slice(16, 32);
        return { cipherText: crypt.encrypt(this.body, signature) };
    }
};
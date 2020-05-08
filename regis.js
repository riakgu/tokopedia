const fetch = require('node-fetch');
const cheerio = require('cheerio');
const delay = require('delay');
const fs = require('fs');

function randstr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const generatoremail = (username = null, domain = null) => new Promise((resolve, reject) => {
    const cookie = (username == null && domain == null) ? `_ga=GA1.2.1243162573.1586462100; _gid=GA1.2.937060635.1586462101;` : `_ga=GA1.2.1243162573.1586462100; _gid=GA1.2.937060635.1586462101; surl=${domain}%2F${username}`;
    fetch('https://generator.email/', {
        method: 'GET',
        headers: {
            "cookie": cookie,
            "user-agent": "Mozilla/5.0 (Linux; Android 7.1.2; SM-G935FD) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
            "sec-fetch-dest": "document",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-user": "?1",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
        },
        timeout: 5000
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const code = (username == null && domain == null) ? $(`span[id="email_ch_text"]`).text() : $(`div[class="unf-user-email__button unf-user-email__button--center unf-user-email__button--otp"]`).text()
            resolve(code);
        })
        .catch(err => reject(err));
});


const tokopedia = (data, bodyne, md5) => new Promise((resolve, reject) => {
    fetch('https://gql.tokopedia.com/', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "x-method": "POST",
            "user-agent": "TkpdConsumer/3.67 (Android 7.1.2;)",
            "request-method": "POST",
            "authorization": `TKPDROID AndroidApps:${data[0]}=`,
            "x-tkpd-app-version": "android-3.67",
            "x-tkpd-app-name": "com.tokopedia.customerappp",
            "os_version": 25,
            "content-md5": md5,
            "x-app-version": 316700000,
            "x-device": "android-3.67",
            "tkpd-sessionid": `${data[1]}`,
            "fingerprint-hash": `${data[2]}`,//32
            "accounts-authorization": "Bearer",
            //   "fingerprint-data": "eyJhbmRyb2lkSWQiOiIgMCAgIiwiYXZhaWxhYmxlUHJvY2Vzc29yIjoiMiIsImNhcnJpZXIiOiJJbmRvc2F0IE9vcmVkb28iLCJjdXJyZW50X29zIjoiNy4xLjIiLCJkZXZpY2VEcGkiOiIxLjIiLCJkZXZpY2VNZW1vcnlDbGFzc0NhcGFjaXR5IjoiMTkyIiwiZGV2aWNlX21hbnVmYWN0dXJlciI6InNhbXN1bmciLCJkZXZpY2VfbW9kZWwiOiJTTS1HOTM1RkQiLCJkZXZpY2VfbmFtZSI6IlNNLUc5MzVGRCIsImRldmljZV9zeXN0ZW0iOiJhbmRyb2lkIiwiaXNfZW11bGF0b3IiOmZhbHNlLCJpc19qYWlsYnJva2VuX3Jvb3RlZCI6dHJ1ZSwiaXNfbmFrYW1hIjoiRmFsc2UiLCJpc190YWJsZXQiOnRydWUsImlzeDg2Ijp0cnVlLCJsYW5ndWFnZSI6ImVuX1VTIiwibG9jYXRpb25fbGF0aXR1ZGUiOiIwLjAiLCJsb2NhdGlvbl9sb25naXR1ZGUiOiIwLjAiLCJwYWNrYWdlTmFtZSI6ImNvbS50b2tvcGVkaWEudGtwZCIsInNjcmVlbl9yZXNvbHV0aW9uIjoiNzIwLDEyODAiLCJzc2lkIjoiXCJjYW1tajE1ODMzXCIiLCJ0aW1lem9uZSI6IkdNVCs4IiwidW5pcXVlX2lkIjoiY2I2NDdmZmUtYzlkMy00NTQ5LTg0NDgtZTI4NDY5ODFhY2E0IiwidXNlcl9hZ2VudCI6IkRhbHZpay8yLjEuMCAoTGludXg7IFU7IEFuZHJvaWQgNy4xLjI7IFNNLUc5MzVGRCBCdWlsZC9OMkc0OEgpIn0=",
            "x-ga-id": `${data[3]}`, // 8-4-4-4-12
            "content-type": "application/json; charset=UTF-8",
            "content-length": bodyne.length,
            "accept-encoding": "gzip"
        },
        body: JSON.stringify(bodyne),
        timeout: 5000
    }).then(async res => {
        const result = {
            body: await res.json(),

        }
        resolve(result.body)
    })
        .catch(err => reject(err))
});

const daftartokopedia = (data, bodyne, md5) => new Promise((resolve, reject) => {
    fetch('https://gql.tokopedia.com/', {
        method: 'POST',
        headers: {
            "cshld-sessionid": "",
            "x-acf-sensor-data": "1,a,f40I8PnFWh5QlfQ5q90ARNL48H54BXS1UlUIX8ux0kAZMBzafBcCI15+rC/IullEIZ96dXI9M6YUsslACyFkOVD/Z+x20yIVpik8rUqkobCCHhKnwa4I33DWRavQGkJa5EPgiMkSbuOX0DgJglMVTwNLHpa/L/Qolc8yFsH03OU=,rE6pZvqqXV25OH8U/qMmTt6d0scF8vIbBrOHij4yjRMFFsqmXzdeLve3Bfu6TgjEGZYG1kT7Yg9Ngcgq+KuTw6PxYlLrcM/pzv2eYUGFHFnDh6h07qYc9MeFIOoIN1bQBmENIXc2H6iyy9Mlk8MA5YQhr2quJLnCO/NMkfpxvPA=$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$1000,0,0",
            "x-tkpd-akamai": "register",
            "x-method": "POST",
            "user-agent": "TkpdConsumer/3.67 (Android 7.1.2;)",
            "x-user-id": "",
            "request-method": "POST",
            "authorization": `TKPDROID AndroidApps:${data[0]}=`,
            "x-tkpd-app-version": "android-3.67",
            "x-tkpd-app-name": "com.tokopedia.customerappp",
            "date": "Fri, 10 Apr 2020 03:56:31 +0800",
            "os_version": 25,
            "content-md5": "3299b715d5251d1eb75832cf45e6e532",
            "x-app-version": 316700000,
            "x-device": "android-3.67",
            "tkpd-sessionid": data[1],
            "tkpd-userid": "",
            "fingerprint-hash": data[2],
            "accounts-authorization": "N2VhOTE5MTgyZmY=f996",
            "fingerprint-data": "eyJhbmRyb2lkSWQiOiIgMCAgIiwiYXZhaWxhYmxlUHJvY2Vzc29yIjoiMiIsImNhcnJpZXIiOiJJbmRvc2F0IE9vcmVkb28iLCJjdXJyZW50X29zIjoiNy4xLjIiLCJkZXZpY2VEcGkiOiIxLjIiLCJkZXZpY2VNZW1vcnlDbGFzc0NhcGFjaXR5IjoiMTkyIiwiZGV2aWNlX21hbnVmYWN0dXJlciI6InNhbXN1bmciLCJkZXZpY2VfbW9kZWwiOiJTTS1HOTM1RkQiLCJkZXZpY2VfbmFtZSI6IlNNLUc5MzVGRCIsImRldmljZV9zeXN0ZW0iOiJhbmRyb2lkIiwiaXNfZW11bGF0b3IiOmZhbHNlLCJpc19qYWlsYnJva2VuX3Jvb3RlZCI6dHJ1ZSwiaXNfbmFrYW1hIjoiRmFsc2UiLCJpc190YWJsZXQiOnRydWUsImlzeDg2Ijp0cnVlLCJsYW5ndWFnZSI6ImVuX1VTIiwibG9jYXRpb25fbGF0aXR1ZGUiOiIwLjAiLCJsb2NhdGlvbl9sb25naXR1ZGUiOiIwLjAiLCJwYWNrYWdlTmFtZSI6ImNvbS50b2tvcGVkaWEudGtwZCIsInNjcmVlbl9yZXNvbHV0aW9uIjoiNzIwLDEyODAiLCJzc2lkIjoiXCJjYW1tajE1ODMzXCIiLCJ0aW1lem9uZSI6IkdNVCs4IiwidW5pcXVlX2lkIjoiY2I2NDdmZmUtYzlkMy00NTQ5LTg0NDgtZTI4NDY5ODFhY2E0IiwidXNlcl9hZ2VudCI6IkRhbHZpay8yLjEuMCAoTGludXg7IFU7IEFuZHJvaWQgNy4xLjI7IFNNLUc5MzVGRCBCdWlsZC9OMkc0OEgpIn0=",
            "x-ga-id": data[3],
            "content-type": "application/json; charset=UTF-8",
            "content-length": bodyne.length,
            "accept-encoding": "gzip"
        },
        body: JSON.stringify(bodyne),
        timeout: 5000
    }).then(async res => {
        const result = {
            body: await res.json(),
        }
        resolve(result.body)
    })
        .catch(err => reject(err))
});

(async () => {
    let a = 0;
    while (true) {
        try {
            a++;
            const randauth = await randstr(27);
            const sessioni = await randstr(11) + ':' + randstr(15) + '-' + randstr(124);
            const fingerha = await randstr(32);
            const xgaid = await randstr(8) + '-' + randstr(4) + '-' + randstr(4) + '-' + randstr(4) + '-' + randstr(12);
            const datacook = [randauth, sessioni, fingerha, xgaid];
            const email = await generatoremail();
            console.log(`[${a}] Trying to Regist ${email}`)
            const fetchlogin = await tokopedia(datacook, [{ "variables": { "id": email }, "operationName": null, "query": "mutation register_check ($id: String!){\n    registerCheck(id: $id) {\n        isExist\n        isPending\n        status\n        registerType\n        userID\n        view\n        errors\n    }\n}\n" }], '0cfc25ca2f5bc23b0abcbec5379bf12c');
            if (fetchlogin[0].data.registerCheck.isExist == false && fetchlogin[0].data.registerCheck.isPending == false && fetchlogin[0].data.registerCheck.errors.length == 0) {
                const fetchgetotp = await tokopedia(datacook, [{ "variables": { "otpType": "126", "userId": "", "msisdn": "", "email": email }, "operationName": null, "query": "query otp_mode_list($otpType: String!, $userId: String, $msisdn: String, $email: String){\n    OTPModeList(otpType: $otpType, userID: $userId, msisdn: $msisdn, email: $email) {\n        success\n        message\n        errorMessage\n        modeLists {\n            modeCode\n            modeText\n            otpListText\n            afterOtpListText\n            afterOtpListTextHtml\n            otpListImgUrl\n            usingPopUp\n            popUpHeader\n            popUpBody\n            countdown\n            otpDigit\n        }\n    }\n}\n" }], "832227a2d2e293986cdc4f5375f5c4e8")
                if (fetchgetotp[0].data.OTPModeList.success == true) {
                    const fetchsendotp = await tokopedia(datacook, [{ "variables": { "otpType": "126", "mode": "email", "email": email, "otpDigit": 4 }, "operationName": null, "query": "query otp_request($otpType: String!, $mode: String, $email: String, $otpDigit: Int){\n    OTPRequest(otpType: $otpType, mode: $mode, email: $email, otpDigit: $otpDigit) {\n        success\n        message\n        errorMessage\n    }\n}\n" }], "3299b715d5251d1eb75832cf45e6e532")
                    if (fetchsendotp[0].data.OTPRequest.success == true) {
                        console.log(`[${a}] Trying Checking Code OTP`)
                        for (i = 0; i < 10; i++) {
                            await delay(5000);
                            const cacahemail = email.split('@');
                            const getcode = await generatoremail(cacahemail[0], cacahemail[1]);
                            if (getcode === "") {
                                console.log(`[${a}] Belum Ada Kode OTP`)
                            } else {
                                console.log(`[${a}] Berhasil Mendapatkan OTP ${getcode}`)
                                const verifcode = await tokopedia(datacook, [{ "variables": { "otpType": "126", "code": getcode, "email": email }, "operationName": null, "query": "query otp_validate($code: String!, $otpType: String, $email: String){\n    OTPValidate(code: $code, otpType: $otpType, email: $email) {\n        success\n        message\n        errorMessage\n        validateToken\n    }\n}\n" }], '7d4d6827d038f9a107a2a0be92da1567');
                                if (verifcode[0].data.OTPValidate.success == true) {
                                    try {
                                        const daftar = await daftartokopedia(datacook, [{ "variables": { "email": email, "password": "Raditya@123", "osType": "1", "regType": "email", "fullname": "Yahya Ganteng", "validateToken": verifcode[0].data.OTPValidate.validateToken }, "operationName": null, "query": "mutation register($regType: String!, $fullname: String, $email: String, $password: String, $osType: String, $validateToken: String) {\n    register(input: {\n        reg_type: $regType\n        fullname: $fullname\n        email: $email\n        password: $password\n        os_type: $osType\n        validate_token: $validateToken\n    }) {\n        user_id\n        sid\n        access_token\n        refresh_token\n        token_type\n        is_active\n        action\n        errors {\n            name\n            message\n        }\n    }\n}\n" }], '08f6d3c821eaf2fdde81904c6294b453')
                                        if (daftar[0].data.register.errors.length == 0) {
                                            fs.appendFileSync('akun_tokped_created.txt', `${email}|Raditya@123|${daftar[0].data.register.user_id}|${daftar[0].data.register.access_token}|${daftar[0].data.register.refresh_token}\n`);
                                            console.log(`[${a}] Sukses Mendaftar\n[${a}] Saved Data\n`)
                                            break;
                                        } else {
                                            console.log(`[${a}] Gagal Mendaftar`)
                                            break;
                                        }
                                    } catch (error) {
                                        fs.appendFileSync('gagal_created.txt', `${email}|${verifcode[0].data.OTPValidate.validateToken}\n`);
                                        console.log(`[${a}] Gagal Registered File Saved`)
                                        break;
                                    }
                                } else {
                                    console.log(`[${a}] Kode OTP Salah`)
                                }
                            }
                        }
                        continue;
                    } else {
                        console.log(`[${a}] Can\'t Send Code OTP`)
                    }
                } else {
                    console.log(`[${a}] Can\'t Send Code OTP`)
                }
            } else {
                console.log(`[${a}] Maybe Registered Or Invalid Email\n`)
            }
        } catch (error) {
            console.log(`[${a}] ${error.message}\n`)
        }
    }
})();
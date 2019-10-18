let cipher = document.getElementsByTagName("cipher-text")[0];
      const storageKey = location.pathname + "password";
      const userStorage = localStorage;
      
      const decrypt = function(cipher_text, password) {
        let key = CryptoJS.enc.Utf8.parse(password);
        let iv = CryptoJS.enc.Utf8.parse(password.substr(16));

        let decryptedData = CryptoJS.AES.decrypt(cipher_text, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        return decryptedData.toString(CryptoJS.enc.Utf8);
      };
      
      const hugoDecrypt = function(password, type) {
        try {
          let cipher_text = cipher.innerText;
          let decrypted_text = decrypt(cipher_text, password);
          if (
            decrypted_text.includes("The quick brown fox jumps over the lazy dog")
          ) {
            cipher.parentElement.outerHTML = decrypted_text;
            userStorage.setItem(storageKey, password);
            document.getElementById("verifyText").outerHTML = "";
          } else {
            if (type === "input") {var $jq=jQuery.noConflict();
              alert('Wrong password!');console.log("Dollar is: "+$+" and jq: "+$jq);
            } else if (type === "storage") {
              userStorage.removeItem(storageKey);
            }
          }
        } catch (error) {
          // console.log(error);
          if (type === "input") {
            alert('Wrong password!');
          } else if (type === "storage") {
            userStorage.removeItem(location.pathname + "password");
          }
        }
      };

      window.onload = () => {
        if (userStorage.getItem(storageKey)) {
          hugoDecrypt(userStorage.getItem(storageKey), "storage");
        }
      };
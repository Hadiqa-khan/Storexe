const CryptoJS = require('crypto-js');
// var key = CryptoJS.enc.Utf8.parse("4ozcn613nu8irs5x");
//         var plaintText = '123'; 
//         //encrypt
//         var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
//           mode: CryptoJS.mode.ECB,
//           padding: CryptoJS.pad.Pkcs7
//         });
//         console.log("plaintText：" + plaintText);
//         console.log("encryptedData ：" + encryptedData);

//         var encryptedDataHexStr = encryptedData.toString(CryptoJS.format.Hex);
//         console.log("encryptedDataHex：" + encryptedDataHexStr );
//         //-------------------------------------------------------------------------
//         //decrypt 
//         var encryptedHex = CryptoJS.enc.Hex.parse(encryptedDataHexStr);
        var encryptedBase64 = "U2FsdGVkX1813EFt3egZrB2aQsht0SN+N/bq6OdzbrbPYkYvRzKycvPdhxL/kQZ/nH56cQwIRdSjhPMLu1yzNVOF4vnWdm6ALEXFAlaUY7sg9knhjMuB4B4mQmAyBEVw1DFnvmyqoV763EkjgNYCThdtxaZwKQQntJIPffbv3vFOcX88LZGZK5K9B6VOUQN+87kABzJZ2XtPf34gSUsdzF8V209nGk5IjOQkDMROlgp6thy9VpDy8fFTG+OAlZ8/80x5ZSlkfP8UOHPksrQ1b/rohPLqLtbfvpnChUOu7pPbvNzVs5Hf/wIo1C9fmRXUBEQXtwTfEhzLF/sDwwHAOZ2RLBHZZiTkhQj+vsq4xzVAFiOUDziuDCWj2cpfeutzS8u4B1R8WP3AcVyrA2cOubXOJ85WWc3A7ec3EU/3jMqJVKxIibL8788watUEOYMjep2LZkZ+llS8orfoGdL1dJjb5z89t4J49hCJzDg8DAQxII2KDf1IFDNvJgBa4iiiH+anQfG5ZFfqiIz1BfP44Q13GruTjgPH80egE2i91scKhSj6xZQm7kIc6vxgj+WK7I0+RJncF4ycKPqljAfzq3O7RlqqCh7or7u2FP2OH37HpxMU/s2sd8SHDWWZ05rWKAYUeZXdYwW5dgPnIu+VllZ2rgV5J5xuMELTwXJH4neDdFVCg5HjVo358tHVGD3qXi92efwwpSyrNU3BnfUfLaYqeFXMqsHf+BjfXeSd7xoAlJg8eX4EeTSiz8S16G8yO642aMHPbVAztStGUxrOgVQwxpoDEobLT1jarcg27To21dG8g4tSGqYFwTkmvGgNs+NOqPeXvRek24Ey0stpSPrbd/RIgPbfM2CyNJfI1KOjQDW96erS3UVLQqdNr3+sutMWHS3w7xQ8MuHfMd6HO5jKKDCSsL26wWWoNOWJNGfaNKlaTwnEJBbUGQou1D96gYQPOasBSHXzcpKZMUUb2K8pWTWMTBrhXJ7Ie8gV/mubF5BrswoRytAgQEog1OH3PKzrA7RmcXOhS3t1nABf+O7r3Z8SWHvk+OUk7R7zuW1XGj5KEkLD6GSx6uZ5MvXdIhvJ+xqPtjLR2Rm2Pv+mA91rw3zX1+mtgWAcX+dkWjWIGenlVn5Qns+UYGNi0NmYMrSXUqNu6NRm5fdSds7EeYIDdcPGAwQObyBDoGxmgqMsISWSyZ391t3Flg2ziQNDxrVTy3NPbBcEuCNHP9rw1UYkuXGL3gDAWmMaNDN0Of6XdrD4zVEe8rjOAmdp8pVWUHWIGrXLgZ9n21GZ0V3hV09KxezYMIgaGGXRJ/bo6hESKatnSa8ltKdpyfVG2SbuzHJG0qxTF67Zctfk9DQQ5aRzPfay2WpMiNFc5nim7PpSofN8C/3kSwKx5ME+d/1tFIOkjlgftly58MaBw0P2B01W6pD4X8ftm8bBr19iQB7t18HLgxPRCi7/t9OLu8290iYN03p+fK7U7UP2h/bneSQDWuWUsHgzj2ya55q8658=";
      
        console.log("encryptedBase64  ：" + encryptedBase64 );

        var decryptedData = CryptoJS.AES.decrypt(encryptedBase64, 'mysecret');
        let decryptText = decryptedData.toString(CryptoJS.enc.Utf8);
        let nothex=CryptoJS.enc.Hex.parse(decryptText);
        console.log("decryptText ：" + nothex.toString(CryptoJS.enc.Utf8));
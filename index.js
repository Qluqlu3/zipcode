const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('郵便番号を入力：', (zipCode) => {
  if (isNaN(zipCode)) {
    console.log('数字で入力してください。');
    return;
  }

  if (zipCode.length !== 7) {
    console.log('7桁で入力してください。');
    return;
  }

  // zipcloud API URLを生成
  const apiUrl = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`;

  // APIリクエストを実行
  https.get(apiUrl, (res) => {
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      // APIレスポンスをパース
      const response = JSON.parse(body);

      // 住所を出力
      if (response.results) {
        console.log(`住所: ${response.results[0].address1} ${response.results[0].address2} ${response.results[0].address3}`);
      } else {
        console.log('その郵便番号に対応した住所は存在しません。');
      }
    });
  });
  rl.close();
});

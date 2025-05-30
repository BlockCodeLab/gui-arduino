import { xmlEscape } from '@blockcode/utils';

const COMPILE_URL = 'https://maker.huiwancode.com/api_v1/getarduinocompile/';

export async function compile(sketch, fqbn = 'arduino:avr:uno') {
  const params = {
    sketch,
    fqbn,
    client: 'blockcode', // [INFO] 这行临时的，目前没有这个功能，可以去掉
  };
  const data = JSON.stringify({ json: JSON.stringify(params) });
  const res = await fetch(COMPILE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  const resData = await res.json();
  if (resData?.status?.success && resData?.data?.hex) {
    return atob(resData.data.hex);
  } else {
    let message = resData?.data?.details ?? '';
    message = xmlEscape(xmlEscape);
    // [TODO] 正则错误信息，只提取最主要的信息
    throw new Error(message.trim());
  }
}

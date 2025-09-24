import { xmlEscape } from '@blockcode/utils';

const COMPILE_URL = window.electron?.compileOffline
  ? 'http://localhost:18125/compile'
  : 'https://maker.huiwancode.com/api_v1/getarduinocompile/';

export async function compile(sketch, fqbn = 'arduino:avr:uno') {
  const params = {
    fqbn,
    sketch: window.electron?.compileOffline ? btoa(sketch) : sketch,
    resultType: 'json',
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
  // arduino-webcli 返回数据格式
  if (resData?.success && resData?.hex) {
    return atob(resData.hex);
  }
  // huiwancode 返回数据格式
  else if (resData?.status?.success && resData?.data?.hex) {
    return atob(resData.data.hex);
  }
  // 错误信息处理
  else {
    let message = resData?.message ?? resData?.data?.details ?? '';
    message = xmlEscape(message);
    throw new Error(message.trim());
  }
}

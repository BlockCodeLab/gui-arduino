import { xmlEscape, Base64Utils } from '@blockcode/utils';
import { ArduinoBoards } from './boards';

const COMPILE_URL = 'https://arduino.blockcode.fun/cli/compile';

const FQBNS = {
  [ArduinoBoards.ArduinoUno]: 'arduino:avr:uno',
  [ArduinoBoards.ArduinoNano]: 'arduino:avr:nano',
  [ArduinoBoards.BLEUNO]: 'arduino:avr:uno',
  [ArduinoBoards.BLENANO]: 'arduino:avr:nano',
};

const base64Content = (content) => {
  if (content instanceof ArrayBuffer) {
    return Base64Utils.arrayBufferToBase64(content);
  } else if (content instanceof Uint8Array) {
    return Base64Utils.arrayBufferToBase64(content.buffer);
  }
  return Base64Utils.stringToBase64(content);
};

export async function compile(boardType, sketch) {
  const params = {
    fqbn: FQBNS[boardType],
    sketch: sketch.map(({ name, content }) => ({
      name,
      content: base64Content(content),
    })),
    resultType: 'json',
  };
  const body = JSON.stringify({ json: JSON.stringify(params) });
  let data;
  if (window.electron?.arduinoCompile) {
    const res = await window.electron?.arduinoCompile(body);
    data = JSON.parse(res);
  } else {
    const res = await fetch(COMPILE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    data = await res.json();
  }
  // HEX 数据处理
  if (data?.success && data?.hex) {
    return atob(data.hex);
  }
  // 错误信息处理
  let message = data?.message ?? data?.error ?? '';
  message = xmlEscape(message);
  throw new Error(message.trim());
}

const COMPILE_URL = 'https://maker.huiwancode.com/api_v1/getarduinocompile/';

export async function compile(sketch, fqbn = 'arduino:avr:uno') {
  const params = {
    sketch,
    fqbn,
    client: 'blockcode', //这行临时的，目前没有这个功能，可以去掉
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
  const base64Data = resData?.data?.hex;
  if (base64Data) {
    return atob(base64Data);
  } else {
    return null;
  }
}

import { addLocalesMessages, Text } from '@blockcode/core';
import { version } from '../package.json';
import featureImage from './feature.png';

addLocalesMessages({
  en: {
    'arduino.name': 'Arduino',
    'arduino.description': 'Native Arduino programming via blocks.',
    'arduino.collaborator': 'Arduino',
  },
  'zh-Hans': {
    'arduino.name': 'Arduino',
    'arduino.description': '通过积木编写原生 Arduino 程序。',
    'arduino.collaborator': 'Arduino',
  },
  'zh-Hant': {
    'arduino.name': 'Arduino',
    'arduino.description': '通过積木編寫原生 Arduino 程序。',
    'arduino.collaborator': 'Arduino',
  },
});

export default {
  version,
  preview: true,
  sortIndex: 100, // 开发板产品
  image: featureImage,
  name: (
    <Text
      id="arduino.name"
      defaultMessage="Arduino"
    />
  ),
  description: (
    <Text
      id="arduino.description"
      defaultMessage="Native Arduino programming via blocks."
    />
  ),
  collaborator: (
    <Text
      id="arduino.collaborator"
      defaultMessage="Arduino"
    />
  ),
  blocksRequired: true,
};

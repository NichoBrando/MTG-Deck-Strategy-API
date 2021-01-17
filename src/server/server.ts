// tslint:disable-next-line
const express = require('express');
const app = express();
const port = 3000;
const Magic = require('mtgsdk-ts');
const _ = require('lodash');

function getCardInfo(card: object) {
  const model = [
    'name',
    'manaCost',
    'cmc',
    'colorIdentity',
    'imageUrl',
    'multiverseid',
  ];
  return _.pick(card, model);
}

const callCards = async (req: any, res: any) => {
  const cards = await Magic.Cards.where({ name: 'nicol' });
  const filteredInfo = await Promise.all(await cards.map(getCardInfo));
  res.send({ cards: filteredInfo });
};

app.get('/', callCards);
app.listen(port);

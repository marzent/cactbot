import Conditions from '../../../../../resources/conditions';
import Outputs from '../../../../../resources/outputs';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

export type Data = RaidbossData;

const triggerSet: TriggerSet<Data> = {
  id: 'AnabaseiosTheNinthCircle',
  zoneId: ZoneId.AnabaseiosTheNinthCircle,
  timelineFile: 'p9n.txt',
  triggers: [
    {
      id: 'P9N Gluttony\'s Augur',
      type: 'StartsUsing',
      netRegex: { id: '8116', source: 'Kokytos', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'P9N Global Spell',
      type: 'StartsUsing',
      netRegex: { id: '8141', source: 'Kokytos', capture: false },
      response: Responses.bleedAoe(),
    },
    {
      id: 'P9N Ascendant Fist',
      type: 'StartsUsing',
      netRegex: { id: '8131', source: 'Kokytos', capture: true },
      response: Responses.tankBuster(),
    },
    {
      id: 'P9N Pulverizing Pounce',
      type: 'HeadMarker',
      netRegex: { id: '00A1' },
      response: Responses.stackMarkerOn(),
    },
    {
      id: 'P9N Fire III',
      type: 'HeadMarker',
      netRegex: { id: '01C5' },
      condition: Conditions.targetIsYou(),
      response: Responses.spread(),
    },
    {
      id: 'P9N Charybdis',
      type: 'StartsUsing',
      netRegex: { id: '8133', source: 'Kokytos', capture: true },
      condition: Conditions.targetIsYou(),
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Drop Puddles Outside',
          de: 'Flächen drausen ablegen',
          fr: 'Déposez les zones au sol à l\'extérieur',
          ja: '散開',
          cn: '散开',
          ko: '바깥쪽에 장판 놓기',
        },
      },
    },
    {
      id: 'P9N Archaic Rockbreaker',
      type: 'StartsUsing',
      netRegex: { id: '8128', source: 'Kokytos', capture: false },
      response: Responses.knockback(),
    },
    {
      id: 'P9N Beastly Roar',
      type: 'StartsUsing',
      netRegex: { id: '8138', source: 'Kokytos', capture: false },
      response: Responses.knockback(),
    },
    {
      id: 'P9N Archaic Demolish',
      type: 'StartsUsing',
      netRegex: { id: '812F', source: 'Kokytos', capture: false },
      alertText: (_data, _matches, output) => output.healerGroups!(),
      outputStrings: {
        healerGroups: Outputs.healerGroups,
      },
    },
    {
      id: 'P9N Front Combination + Inside Roundhouse',
      type: 'StartsUsing',
      netRegex: { id: '8148', source: 'Kokytos', capture: false },
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Get Behind and Under',
          de: 'Geh nach Hinten und Unter den Boss',
          fr: 'Allez derrière et sous le boss',
          ja: '後ろ => 中へ',
          cn: '去背后靠近',
          ko: '보스 뒤 그리고 안으로',
        },
      },
    },
    {
      id: 'P9N Rear Combination + Inside Roundhouse',
      type: 'StartsUsing',
      netRegex: { id: '814A', source: 'Kokytos', capture: false },
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Go Front and Under',
          de: 'Geh nach Vorne und Unter den Boss',
          ja: '前 => 中へ',
          cn: '去正面靠近',
          ko: '보스 앞 그리고 안으로',
        },
      },
    },
    {
      id: 'P9N Front Combination + Outside Roundhouse',
      type: 'StartsUsing',
      netRegex: { id: '8147', source: 'Kokytos', capture: false },
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Get Behind and Out',
          de: 'Geh nach Hinten und Raus',
          fr: 'Allez derrière et à l\'extérieur',
          ja: '後ろの外側へ',
          cn: '去背后远离',
          ko: '보스 뒤 바깥쪽으로',
        },
      },
    },
    {
      id: 'P9N Rear Combination + Outside Roundhouse',
      type: 'StartsUsing',
      netRegex: { id: '8149', source: 'Kokytos', capture: false },
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Go Front and Out',
          de: 'Geh nach Vorne und Raus',
          fr: 'Allez devant et à l\'extérieur',
          ja: '前の外側へ',
          cn: '去正面远离',
          ko: '보스 앞 바깥쪽으로',
        },
      },
    },
    {
      id: 'P9N Ecliptic Meteor',
      type: 'StartsUsing',
      netRegex: { id: '813B', source: 'Kokytos', capture: false },
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Hide behind unbroken meteor',
          de: 'Hinter einem nicht zerbrochenen Meteor verstecken',
          fr: 'Cachez-vous derrière le météore intact',
          ja: '壊れていないメテオの後ろへ',
          cn: '躲在未破碎的陨石后',
          ko: '금이 안 간 돌 뒤에 숨기',
        },
      },
    },
    {
      id: 'P9N Burst',
      type: 'StartsUsing',
      netRegex: { id: '8136', source: 'Comet', capture: false },
      response: Responses.moveAway(),
    },
    {
      id: 'P9N Gluttonous Rampage',
      type: 'HeadMarker',
      netRegex: { id: '013A', capture: true },
      alertText: (data, matches, output) => {
        if (data.me === matches.target)
          return output.tankbusterOnYouStretchTethers!();

        if (data.role === 'healer' || data.job === 'BLU')
          return output.tankbusterOn!({ player: data.party.member(matches.target) });
      },
      outputStrings: {
        tankbusterOnYouStretchTethers: {
          en: 'Tankbuster on YOU -- stretch tether',
          de: 'Tankbuster auf DIR -- Verbindung strecken',
          fr: 'Tankbuster sur VOUS -- Étirez le lien',
          ja: 'タン強 -- 離れる',
          cn: '坦克死刑 -- 远离',
          ko: '탱버 대상자 -- 멀리 떨어지기',
        },
        tankbusterOn: {
          en: 'Tankbuster on ${player}',
          de: 'Tankbuster auf ${player}',
          fr: 'Tankbuster sur ${player}',
          ja: 'タン強: ${player}',
          cn: '坦克死刑 ${player}',
          ko: '"${player}" 탱버',
        },
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'en',
      'replaceText': {
        'Front Combination/Rear Combination': 'Front/Rear Combination',
        'Inside Roundhouse/Outside Roundhouse': 'Inside/Outside Roundhouse',
      },
    },
    {
      'locale': 'de',
      'replaceSync': {
        'Comet': 'Komet',
        'Fire Sphere': 'Feuersphäre',
        'Ice Sphere': 'Eissphäre',
        'Kokytos': 'Kokytos',
      },
      'replaceText': {
        '\\(Behemoth\\)': '(Behemot)',
        '\\(Fighter\\)': '(Kämpfer)',
        '\\(Mage\\)': '(Magier)',
        '\\(cast\\)': '(Wirken)',
        '\\(resolve\\)': '(Auflösen)',
        'Archaic Demolish': 'Altes Demolieren',
        'Archaic Rockbreaker': 'Alte Erdspaltung',
        'Ascendant Fist': 'Steigende Faust',
        'Beastly Bile': 'Bestiengalle',
        'Beastly Roar': 'Bestialisches Brüllen',
        'Blizzard III': 'Eisga',
        'Burst': 'Zerschmetterung',
        'Charybdis': 'Charybdis',
        'Comet': 'Komet',
        'Disgorge': 'Seelenwende',
        'Dualspell': 'Doppelspruch',
        'Ecliptic Meteor': 'Ekliptik-Meteor',
        'Explosion': 'Explosion',
        'Fire III': 'Feuga',
        'Front Combination': 'Trittfolge vor',
        'Global Spell': 'Spruchsphäre',
        'Gluttonous Rampage': 'Fresswahn',
        'Gluttony\'s Augur': 'Omen der Fresssucht',
        'Iceflame Summoning': 'Beschwörung von Feuer und Eis',
        'Inside Roundhouse': 'Rundumtritt innen',
        'Outside Roundhouse': 'Rundumtritt außen',
        'Pulverizing Pounce': 'Schweres Schmettern',
        'Ravening': 'Seelenfresser',
        'Ravenous Bite': 'Mordshunger',
        'Rear Combination': 'Trittfolge zurück',
        'Shockwave': 'Schockwelle',
        'Sphere Shatter': 'Sphärensplitterung',
        'Swinging Kick': 'Schwungattacke',
        'Touchdown': 'Himmelssturz',
      },
    },
    {
      'locale': 'fr',
      'missingTranslations': true,
      'replaceSync': {
        'Comet': 'Comète',
        'Fire Sphere': 'Sphère de feu',
        'Ice Sphere': 'sphère gelée',
        'Kokytos': 'Cocyte',
      },
      'replaceText': {
        'Archaic Demolish': 'Démolition archaïque',
        'Archaic Rockbreaker': 'Briseur de rocs archaïque',
        'Ascendant Fist': 'Uppercut pénétrant',
        'Beastly Bile': 'Bile de bête',
        'Beastly Roar': 'Rugissement bestial',
        'Blizzard III': 'Méga Glace',
        'Burst': 'Éclatement',
        'Charybdis': 'Charybde',
        'Comet': 'Comète',
        'Disgorge': 'Renvoi d\'âme',
        'Dualspell': 'Double sort',
        'Ecliptic Meteor': 'Météore écliptique',
        'Explosion': 'Explosion',
        'Fire III': 'Méga Feu',
        'Front Combination': 'Coups de pied pivotants avant en série',
        'Global Spell': 'Sort englobant',
        'Gluttonous Rampage': 'Ravage glouton',
        'Gluttony\'s Augur': 'Augure de gloutonnerie',
        'Iceflame Summoning': 'Invocation de feu et de glace',
        'Inside Roundhouse': 'Coup de pied pivotant intérieur',
        'Outside Roundhouse': 'Coup de pied pivotant extérieur',
        'Pulverizing Pounce': 'Attaque subite violente',
        'Ravening': 'Dévoration d\'âme',
        'Ravenous Bite': 'Morsure vorace',
        'Rear Combination': 'Coups de pied pivotants arrière en série',
        'Shockwave': 'Onde de choc',
        'Sphere Shatter': 'Rupture glacée',
        'Swinging Kick': 'Demi-pivot',
        'Touchdown': 'Atterrissage',
      },
    },
    {
      'locale': 'ja',
      'missingTranslations': true,
      'replaceSync': {
        'Comet': 'コメット',
        'Fire Sphere': 'ファイアスフィア',
        'Ice Sphere': 'アイススフィア',
        'Kokytos': 'コキュートス',
      },
      'replaceText': {
        'Archaic Demolish': '古式破砕拳',
        'Archaic Rockbreaker': '古式地烈斬',
        'Ascendant Fist': '穿昇拳',
        'Beastly Bile': 'ビーストバイル',
        'Beastly Roar': 'ビーストロア',
        'Blizzard III': 'ブリザガ',
        'Burst': '飛散',
        'Charybdis': 'ミールストーム',
        'Comet': 'コメット',
        'Disgorge': 'ソウルリバース',
        'Dualspell': 'ダブルスペル',
        'Ecliptic Meteor': 'エクリプスメテオ',
        'Explosion': '爆発',
        'Fire III': 'ファイガ',
        'Front Combination': '前方連転脚',
        'Global Spell': 'スペルグローブ',
        'Gluttonous Rampage': 'グラットンランページ',
        'Gluttony\'s Augur': 'グラトニーズアーガー',
        'Iceflame Summoning': 'サモンファイア＆アイス',
        'Inside Roundhouse': '内転脚',
        'Outside Roundhouse': '外転脚',
        'Pulverizing Pounce': 'ヘビーパウンス',
        'Ravening': '魂喰らい',
        'Ravenous Bite': 'ラヴェナスバイト',
        'Rear Combination': '後方連転脚',
        'Shockwave': '衝撃波',
        'Sphere Shatter': '破裂',
        'Swinging Kick': '旋身撃',
        'Touchdown': 'タッチダウン',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Comet': '彗星',
        'Fire Sphere': '烈火晶球',
        'Ice Sphere': '冰晶球',
        'Kokytos': '科库托斯',
      },
      'replaceText': {
        '\\(Behemoth\\)': '(野兽)',
        '\\(Fighter\\)': '(武术家)',
        '\\(Mage\\)': '(魔法师)',
        '\\(cast\\)': '(咏唱)',
        '\\(resolve\\)': '(判定)',
        'Archaic Demolish': '古式破碎拳',
        'Archaic Rockbreaker': '古式地烈劲',
        'Ascendant Fist': '穿升拳',
        'Beastly Bile': '野兽胆汁',
        'Beastly Roar': '残虐咆哮',
        'Blizzard III': '冰封',
        'Burst': '飞散',
        'Charybdis': '大漩涡',
        'Comet': '彗星',
        'Disgorge': '吐魂',
        'Dualspell': '双重咏唱',
        'Ecliptic Meteor': '黄道陨石',
        'Explosion': '爆炸',
        'Fire III': '爆炎',
        'Front Combination': '前方连转脚',
        'Global Spell': '全域咏唱',
        'Gluttonous Rampage': '暴食狂怒',
        'Gluttony\'s Augur': '暴食预兆',
        'Iceflame Summoning': '冰火召唤',
        'Inside Roundhouse': '内转脚',
        'Outside Roundhouse': '外转脚',
        'Pulverizing Pounce': '重爪袭',
        'Ravening': '噬魂',
        'Ravenous Bite': '极饿咬',
        'Rear Combination': '后方连转脚',
        'Shockwave': '冲击波',
        'Sphere Shatter': '碎裂',
        'Swinging Kick': '旋身击',
        'Touchdown': '空降',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Comet': '혜성',
        'Fire Sphere': '불 구체',
        'Ice Sphere': '얼음 구체',
        'Kokytos': '코퀴토스',
      },
      'replaceText': {
        '\\(Behemoth\\)': '(마수)',
        '\\(Fighter\\)': '(격투가)',
        '\\(Mage\\)': '(마도사)',
        '\\(cast\\)': '(시전)',
        '\\(resolve\\)': '(실행)',
        'Archaic Demolish': '고대 파쇄권',
        'Archaic Rockbreaker': '고대 지열참',
        'Ascendant Fist': '천승권',
        'Beastly Bile': '마수 담즙',
        'Beastly Roar': '야수의 포효',
        'Blizzard III': '블리자가',
        'Burst': '산산조각',
        'Charybdis': '대소용돌이',
        'Comet': '혜성',
        'Disgorge': '영혼 토출',
        'Dualspell': '이중 시전',
        'Ecliptic Meteor': '황도 메테오',
        'Explosion': '폭발',
        'Fire III': '파이가',
        'Front Combination': '전방 연속 돌려차기',
        'Global Spell': '전방위 마법',
        'Gluttonous Rampage': '게걸스러운 돌격',
        'Gluttony\'s Augur': '폭식의 전조',
        'Iceflame Summoning': '얼음불 소환',
        'Inside Roundhouse': '안쪽 돌려차기',
        'Outside Roundhouse': '바깥쪽 돌려차기',
        'Pulverizing Pounce': '육중한 덮치기',
        'Ravening': '영혼 포식',
        'Ravenous Bite': '탐욕스러운 입질',
        'Rear Combination': '후방 연속 돌려차기',
        'Shockwave': '충격파',
        'Sphere Shatter': '파열',
        'Swinging Kick': '후려차기',
        'Touchdown': '착지',
      },
    },
  ],
};

export default triggerSet;

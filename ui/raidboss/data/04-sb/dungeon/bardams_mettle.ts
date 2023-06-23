import Conditions from '../../../../../resources/conditions';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

export interface Data extends RaidbossData {
  deadBardam?: boolean;
}

const triggerSet: TriggerSet<Data> = {
  id: 'BardamsMettle',
  zoneId: ZoneId.BardamsMettle,
  timelineFile: 'bardams_mettle.txt',
  timelineTriggers: [
    {
      id: 'Bardam\'s Mettle Feathercut',
      // untelegraphed, instant tank cleave
      regex: /Feathercut/,
      beforeSeconds: 4,
      response: Responses.tankCleave(),
    },
  ],
  triggers: [
    {
      id: 'Bardam\'s Mettle Rush',
      type: 'Tether',
      // 0039 = pink, un-stretched tether
      // 0001 = purple, stretched tether
      // capture both in case we start already stretched
      netRegex: { id: ['0039', '0001'], source: 'Garula' },
      condition: Conditions.targetIsYou(),
      suppressSeconds: 15, // tether log line is sent repeatedly until mechanic finishes
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Run Away From Boss',
          de: 'Renn weg vom Boss',
          fr: 'Courez loin du boss',
          ja: 'ボスから離れる',
          cn: '远离Boss',
          ko: '보스와 거리 벌리기',
        },
      },
    },
    {
      id: 'Bardam\'s Mettle War Cry + Earthquake',
      // War Cry (1EFA, small raidwide, triggers adds) and Earthquake (1EFB, medium raidwide w/ 2s stun)
      // are instant and used after Rush (1EF9, charge on tethered player)
      type: 'Ability',
      netRegex: { id: '1EF9', source: 'Garula', capture: false },
      response: Responses.aoe(),
    },
    {
      // Both Bardam and Yol use the 0017 head marker.
      // If we're in the Yol encounter, we're obviously not fighting Bardam.
      // trigger off Yol's first auto in case of chat lines being turned off
      id: 'Bardam\'s Mettle Dead Bardam',
      type: 'Ability',
      netRegex: { id: '367', source: 'Yol', capture: false },
      suppressSeconds: 99999,
      run: (data) => data.deadBardam = true,
    },
    {
      id: 'Bardam\'s Mettle Empty Gaze',
      type: 'StartsUsing',
      netRegex: { id: '1F04', source: 'Hunter Of Bardam', capture: false },
      response: Responses.lookAway(),
    },
    {
      id: 'Bardam\'s Mettle Sacrifice',
      type: 'StartsUsing',
      netRegex: { id: '1F01', source: 'Bardam', capture: false },
      suppressSeconds: 1,
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Stand in a tower',
          de: 'Im Turm stehen',
          fr: 'Placez-vous dans une tour',
          ja: '塔を踏む',
          cn: '踩塔',
          ko: '장판 들어가기',
        },
      },
    },
    {
      // Bardam casts Comet repeatedly during this phase,
      // but 257D is used only once. The others are 257E.
      id: 'Bardam\'s Mettle Comet',
      type: 'StartsUsing',
      netRegex: { id: '257D', source: 'Bardam', capture: false },
      suppressSeconds: 1,
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: '8x puddles on YOU',
          de: '8x Fläche auf DIR',
          fr: '8x Zones au sol sur VOUS',
          ja: '8つ波動砲',
          cn: '躲避8连追踪AOE',
          ko: '8연속 장판 준비',
        },
      },
    },
    {
      id: 'Bardam\'s Mettle Meteor Impact',
      type: 'StartsUsing',
      netRegex: { id: '2582', source: 'Looming Shadow' },
      delaySeconds: (_data, matches) => parseFloat(matches.castTime) - 7,
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Hide behind boulder',
          de: 'Hinter dem Brocken verstecken',
          fr: 'Cachez-vous derrière le rocher',
          ja: 'メテオの後ろに',
          cn: '站在陨石后',
          ko: '운석 뒤에 숨기',
        },
      },
    },
    {
      id: 'Bardam\'s Mettle Wind Unbound',
      type: 'StartsUsing',
      netRegex: { id: '1F0A', source: 'Yol', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'Bardam\'s Mettle Flutterfall',
      type: 'HeadMarker',
      netRegex: { id: '0017' },
      condition: (data, matches) => data.me === matches.target && data.deadBardam,
      response: Responses.spread(),
    },
    {
      id: 'Bardam\'s Mettle Eye Of The Fierce',
      type: 'StartsUsing',
      netRegex: { id: '1F0D', source: 'Yol', capture: false },
      response: Responses.lookAway('alert'),
    },
    {
      id: 'Bardam\'s Mettle Wingbeat You',
      type: 'HeadMarker',
      netRegex: { id: '0010' },
      condition: Conditions.targetIsYou(),
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Knockback Laser on YOU',
          de: 'Rückstoß-Laser auf DIR',
          fr: 'Poussée laser sur VOUS',
          ja: '自分にノックバック',
          cn: '击退点名',
          ko: '날갯짓 대상자',
        },
      },
    },
    {
      id: 'Bardam\'s Mettle Wingbeat Others',
      type: 'HeadMarker',
      netRegex: { id: '0010' },
      condition: Conditions.targetIsNotYou(),
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Avoid Laser',
          de: 'Laser ausweichen',
          fr: 'Évitez le laser',
          ja: 'ノックバックレーザーを避ける',
          cn: '躲避击退点名',
          ko: '날갯짓 피하기',
        },
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Yol(?! )': 'Yol',
        'Yol Feather': 'Yol-Feder',
        'Warrior Of Bardam': 'Bardams Krieger',
        'Voiceless Muse': 'Stumme Muse',
        'Throwing Spear': 'Wurfspeer',
        'Star Shard': 'Sternensplitter',
        'Rebirth Of Bardam The Brave': 'Bardams Wiedergeburt',
        'Looming Shadow': 'Lauernd(?:e|er|es|en) Schatten',
        'Hunter Of Bardam': 'Bardams Jäger',
        'Corpsecleaner Eagle': 'Leichenputzer',
        'Garula': 'Garula',
        'Bardam\'s Hunt': 'Bardams Jagdgrund',
        '(?<! )Bardam(?!( |s|\'))': 'Bardams Statue',
      },
      'replaceText': {
        'Wingbeat': 'Flügelschlag',
        'Wind Unbound': 'Entfesselter Wind',
        'War Cry': 'Kampfgebrüll',
        'Tremblor': 'Erdbeben',
        'Travail': 'Probe',
        'Sacrifice': 'Opfer',
        'Rush': 'Stürmen',
        'Reconstruct': 'Rekonstruieren',
        'Pinion': 'Flotter Fittich',
        'Meteor Impact': 'Meteoreinschlag',
        'Magnetism': 'Magnetismus',
        'Heavy Strike': 'Schwerer Schlag',
        'Heave': 'Hochhieven',
        'Flutterfall': 'Federsturm',
        'Feathercut': 'Federschnitt',
        'Eye of the Fierce': 'Grimmiger Blick',
        'Empty Gaze': 'Stierer Blick',
        'Earthquake': 'Erdbeben',
        'Crumbling Crust': 'Zerberstende Erde',
        'Comet Impact': 'Kometeneinschlag',
        'Comet(?! Impact)': 'Komet',
        'Charge': 'Sturm',
        'Bardam\'s Ring': 'Bardams Ring',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Yol(?! )': 'Yol',
        'Yol Feather': 'plume de Yol',
        'Warrior Of Bardam': 'guerrier de Bardam',
        'Voiceless Muse': 'la Muse sans voix',
        'Throwing Spear': 'lance de jet',
        'Star Shard': 'éclat d\'étoile',
        'Rebirth Of Bardam The Brave': 'la Renaissance de Bardam le Brave',
        'Looming Shadow': 'ombre grandissante',
        'Hunter Of Bardam': 'chasseur de Bardam',
        'Corpsecleaner Eagle': 'aigle charognard',
        'Garula': 'Garula',
        'Bardam\'s Hunt': 'la Chasse de Bardam',
        '(?<! )Bardam(?!( |s|\'))': 'Bardam',
      },
      'replaceText': {
        'Wingbeat': 'Battement d\'ailes',
        'Wind Unbound': 'Relâche de vent',
        'War Cry': 'Cri désorientant',
        'Tremblor': 'Tremblement de terre',
        'Travail': 'Labeur',
        'Sacrifice': 'Sacrifice',
        'Rush': 'Ruée',
        'Reconstruct': 'Reconstruction',
        'Pinion': 'Rémiges',
        'Meteor Impact': 'Impact de météore',
        'Magnetism': 'Magnétisme',
        'Heavy Strike': 'Frappe lourde',
        'Heave': 'Soulèvement',
        'Flutterfall': 'Tempête de plumes',
        'Feathercut': 'Coupe de plumes',
        'Eye of the Fierce': 'Œil de rapace',
        'Empty Gaze': 'Œil terne',
        'Earthquake': 'Tremblement de terre',
        'Crumbling Crust': 'Croûte croulante',
        'Comet Impact': 'Impact de comète',
        'Comet(?! Impact)': 'Comète',
        'Charge': 'Charge',
        'Bardam\'s Ring': 'Anneau de Bardam',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Yol(?! )': 'ヨル',
        'Yol Feather': 'ヨルの羽根',
        'Warrior Of Bardam': 'バルダムズ・ウォーリアー',
        'Voiceless Muse': '物言わぬ語り部',
        'Throwing Spear': '投げ槍',
        'Star Shard': '星片',
        'Rebirth Of Bardam The Brave': '勇士バルダムの再誕地',
        'Looming Shadow': '落下地点',
        'Hunter Of Bardam': 'バルダムズ・ハンター',
        'Corpsecleaner Eagle': 'スカヴェンジング・イーグル',
        'Garula': 'ガルラ',
        'Bardam\'s Hunt': '戦士バルダムの狩場',
        '(?<! )Bardam(?!( |s|\'))': 'バルダムの巨像',
      },
      'replaceText': {
        'Wingbeat': 'ウィングガスト',
        'Wind Unbound': 'ウィンドアンバウンド',
        'War Cry': '雄叫び',
        'Tremblor': '地震',
        'Travail': '試練',
        'Sacrifice': '犠牲',
        'Rush': '突進',
        'Reconstruct': '破壊再生',
        'Pinion': 'フェザーダーツ',
        'Meteor Impact': 'メテオインパクト',
        'Magnetism': '磁力',
        'Heavy Strike': 'ヘヴィストライク',
        'Heave': 'しゃくり上げ',
        'Flutterfall': 'フェザーストーム',
        'Feathercut': 'フェザーカッター',
        'Eye of the Fierce': '猛禽の眼',
        'Empty Gaze': '虚無の瞳',
        'Earthquake': '地震',
        'Crumbling Crust': '地盤崩し',
        'Comet Impact': 'コメットインパクト',
        'Comet(?! Impact)': 'コメット',
        'Charge': 'チャージ',
        'Bardam\'s Ring': 'バルダムリング',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Yol(?! )': '胡鹰',
        'Yol Feather': '胡鹰的羽毛',
        'Warrior Of Bardam': '巴儿达木的战士',
        'Voiceless Muse': '无声的叙事者',
        'Throwing Spear': '投枪',
        'Star Shard': '星体碎片',
        'Rebirth Of Bardam The Brave': '勇猛巴儿达木的重生',
        'Looming Shadow': '坠落地点',
        'Hunter Of Bardam': '巴儿达木的猎人',
        'Corpsecleaner Eagle': '清道雄鹰',
        'Garula': '加鲁拉',
        'Bardam\'s Hunt': '战士巴儿达木的猎场',
        '(?<! )Bardam(?!( |s|\'))': '巴儿达木巨像',
      },
      'replaceText': {
        'Wingbeat': '翼唤狂风',
        'Wind Unbound': '无拘之风',
        'War Cry': '吼叫',
        'Tremblor': '地震',
        'Travail': '试炼',
        'Sacrifice': '牺牲',
        'Rush': '突进',
        'Reconstruct': '破坏再生',
        'Pinion': '飞羽镖',
        'Meteor Impact': '陨石冲击',
        'Magnetism': '磁力',
        'Heavy Strike': '灵极重击',
        'Heave': '掀地',
        'Flutterfall': '羽落如雨',
        'Feathercut': '飞羽斩',
        'Eye of the Fierce': '猛禽之眼',
        'Empty Gaze': '空洞之瞳',
        'Earthquake': '地震',
        'Crumbling Crust': '地面崩裂',
        'Comet Impact': '星屑冲击',
        'Comet(?! Impact)': '彗星',
        'Charge': '刺冲',
        'Bardam\'s Ring': '巴儿达木之环',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Yol(?! )': '욜',
        'Yol Feather': '욜의 깃털',
        'Warrior Of Bardam': '바르담 전사',
        'Voiceless Muse': '말 없는 이야기꾼',
        'Throwing Spear': '투척창',
        'Star Shard': '별의 파편',
        'Rebirth Of Bardam The Brave': '용사 바르담의 재탄생지',
        'Looming Shadow': '낙하지점',
        'Hunter Of Bardam': '바르담 사냥꾼',
        'Corpsecleaner Eagle': '청소 독수리',
        'Garula': '가루라',
        'Bardam\'s Hunt': '전사 바르담의 사냥터',
        '(?<! )Bardam(?!( |s|\'))': '바르담 조각상',
      },
      'replaceText': {
        'Wingbeat': '날갯짓',
        'Wind Unbound': '바람 해방',
        'War Cry': '우렁찬 외침',
        'Tremblor': '지진',
        'Travail': '시련',
        'Sacrifice': '희생',
        'Rush': '돌진',
        'Reconstruct': '파괴 재생',
        'Pinion': '깃털 쏘기',
        'Meteor Impact': '운석 낙하',
        'Magnetism': '자력',
        'Heavy Strike': '무거운 충격',
        'Heave': '흐느낌',
        'Flutterfall': '깃털 폭풍',
        'Feathercut': '칼날 깃털',
        'Eye of the Fierce': '맹금류의 눈',
        'Empty Gaze': '허무한 눈동자',
        'Earthquake': '대지진',
        'Crumbling Crust': '지반 붕괴',
        'Comet Impact': '혜성 낙하',
        'Comet(?! Impact)': '혜성',
        'Charge': '돌격',
        'Bardam\'s Ring': '바르담의 고리',
      },
    },
  ],
};

export default triggerSet;

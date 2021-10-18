import React from 'react'
import { Typography } from '../../../components'
const { Title, Text, Link, Paragraph } = Typography

const Base = () => {
  const [editableStr, setEditableStr] = React.useState('This is an editable text.')
  return (
    <Typography>
      <Title>h1. BrickDesign</Title>
      <Title level={2}>h2. BrickDesign</Title>
      <Title level={3}>h3. BrickDesign</Title>
      <Title level={4}>h4. BrickDesign</Title>
      <Title level={5}>h5. BrickDesign</Title>
      <br />
      <br />
      <p>
        <Text>BrickDesign (default)</Text>
      </p>
      <p>
        <Text type="secondary">BrickDesign (secondary)</Text>
      </p>
      <p>
        <Text type="success">BrickDesign (success)</Text>
      </p>
      <p>
        <Text type="warning">BrickDesign (warning)</Text>
      </p>
      <p>
        <Text type="danger">BrickDesign (danger)</Text>
      </p>
      <p>
        <Text disabled>BrickDesign (disabled)</Text>
      </p>
      <p>
        <Text mark>BrickDesign (mark)</Text>
      </p>
      <p>
        <Text code>BrickDesign (code)</Text>
      </p>
      <p>
        <Text keyboard>BrickDesign (keyboard)</Text>
      </p>
      <p>
        <Text underline>BrickDesign (underline)</Text>
      </p>
      <p>
        <Text delete>BrickDesign (delete)</Text>
      </p>
      <p>
        <Text strong>BrickDesign (strong)</Text>
      </p>
      <p>
        <Link href="https://ant.design" target="_blank">
          BrickDesign (Link)
        </Link>
      </p>
      <p>
        <Paragraph
          ellipsis={{
            rows: 3,
            expandable: true,
            suffix: '...'
          }}
        >
          承以朱陆同异见询学术不明于世久矣此正吾侪今日之所宜明辨者细观来教则舆庵之主象山既失而吾兄之主晦庵亦未为得也是朱非
          陆天下之论定久矣久则难变也虽微吾兄之争舆庵亦岂能遽行其说乎故仆以为二兄今日之论正不必求胜务求象山之所以非晦庵之所
          以是穷本极源真有以见其几微得于失毫忽之间若明者之听讼其事之曲者既有以辨其情之不得已而辞之直者复有以察其处之或未当
          使受罪者得以伸其情而获伸者亦有所不得辞其责则有以尽夫事理之公即夫人心之安而可以俟圣人于百世矣今二兄之论乃若出于求
          胜者求胜则是勤于气也动于气则于义理之正何啻千里而又何是非之论乎凡论古人得失决不可以意度而悬断之今舆庵之论象山曰虽
          其专以尊德性为主未免堕于禅学之虚空而其持守端实终不失为圣人之徒若晦庵之一于道问学则支离决裂非复圣门诚意正心之学矣
          吾兄之论晦庵曰虽其专以道问学为主未免失于俗学之支离而且循序渐进终不背于大学之训若象山之一于尊德性则虚无寂灭非复大
          学格物致知之学矣夫既曰尊德性则不可谓堕于禅学之虚空堕于禅学之虚空则不可谓之尊德性矣既曰道问学则不可谓失于俗学之支
          离失于俗学之支离则不可谓道问学矣二者之辨间不容发然则二兄之论皆未免于意度也昔者子思之论学盖不下千百言而括之以尊德
          性而道问学之一语即如二兄之辨一以尊德性为主一以道问学为事则是二者固皆未免于一偏而是非之论尚未有所定也乌得各持一是
          而遽以相非为乎故朴愿二兄置心于公平正大之地无务求胜夫论学而务以求胜岂所谓尊德性乎岂所谓道问学乎以某所见非独吾兄之
          非象山舆庵之非晦庵皆失之非而吾兄之是晦庵舆庵之是象山亦皆未得其所以是也稍暇当面悉姑务养心息辨毋遽
        </Paragraph>
      </p>
      <p>
        <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph>
      </p>
      <p>
        <Paragraph copyable>This is a copyable text.</Paragraph>
      </p>
    </Typography>
  )
}
export default Base
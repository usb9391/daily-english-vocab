'use strict';

const groups = [
  { name: '作者态度', icon: 'message', entries: `
positive|积极的、肯定的
negative|消极的、否定的
optimistic|乐观的|cautious optimism · 谨慎乐观
pessimistic|悲观的
supportive|支持的
approving|赞同的
favorable|赞成的、有利的
critical|批判的、关键的|highly critical · 持强烈批判态度
skeptical|怀疑的|remain skeptical · 仍然持怀疑态度
doubtful|怀疑的、不确定的
objective|客观的
subjective|主观的
neutral|中立的
indifferent|漠不关心的
concerned|担忧的、有关的|deeply concerned · 深感担忧
cautious|谨慎的
reserved|有保留的、内敛的
biased|有偏见的
hostile|敌对的
ironic|讽刺的
sympathetic|同情的、赞同的
ambiguous|模棱两可的
contradictory|矛盾的
tolerant|宽容的
enthusiastic|热情的
disappointed|失望的
justified|合理的、有正当理由的
unreasonable|不合理的
questionable|值得怀疑的
controversial|有争议的
` },
  { name: '逻辑关系', icon: 'route', entries: `
however|然而|转折
nevertheless|尽管如此|让步、转折
nonetheless|尽管如此|让步、转折
yet|然而、尚未|转折或时间
whereas|然而、相比之下|对比
while|虽然、然而、当……时|让步、对比或时间
although|尽管|让步
though|尽管、不过|让步
despite|尽管|让步，后接名词或动名词等
notwithstanding|尽管|让步
instead|相反、取而代之|替代
rather|相反、宁可、相当|修正、偏好或程度
otherwise|否则|条件
conversely|相反地|对比
unlike|不像、与……不同|对比
therefore|因此|结果
thus|因此、从而|结果
hence|因此|结果
consequently|因此、结果|结果
accordingly|因此、相应地|结果
since|由于、自从|原因或时间
given|考虑到、鉴于|原因
moreover|此外|递进
furthermore|此外、而且|递进
indeed|的确、事实上|强调
even|甚至|强调
likewise|同样地|类比
similarly|类似地|类比
unless|除非|条件
provided|假如、在……条件下|条件，常见 provided that
` },
  { name: '核心动词', icon: 'bolt', entries: `
suggest|表明、暗示、建议|表「暗示」时可联想 indicate / imply
indicate|表明、指出
imply|暗示、意味着
reveal|揭示、暴露
reflect|反映、反思
demonstrate|证明、表明
illustrate|说明、举例说明
assume|假设、认为
claim|声称、主张
argue|论证、认为|argue that … · 提出……的观点
assert|断言、主张
maintain|维持、坚持认为|maintain that … · 坚持认为……
acknowledge|承认|同义线索 · admit
recognize|认识到、认可
admit|承认、准许进入
emphasize|强调
highlight|强调、突出
address|处理、解决|address the problem · 处理这个问题
assess|评估
evaluate|评价、评估
determine|决定、确定
identify|识别、确定
establish|建立、证实
derive|获得、源自
attribute|将……归因于|attribute A to B · 把 A 归因于 B
contribute|贡献、促成
promote|促进、推广|表「促进」时可联想 facilitate / encourage
facilitate|促进、使便利
enhance|提高、增强
reinforce|加强、巩固
encourage|鼓励、促进
stimulate|刺激、促进
undermine|削弱、损害|同义线索 · weaken / damage
diminish|减少、削弱
decline|下降、拒绝
restrict|限制|同义线索 · limit
impose|强加、施加
eliminate|消除、淘汰|同义线索 · remove
prevent|阻止、预防
discourage|阻碍、使泄气
prohibit|禁止
challenge|挑战、质疑
criticize|批评
oppose|反对|同义线索 · object to
reject|拒绝、否定
advocate|提倡、支持
adopt|采用、采纳
adapt|适应、改编
acquire|获得、习得
obtain|获得|同义线索 · acquire
retain|保留、保持
preserve|保存、保护|表「保护」时可联想 protect
sustain|维持、支撑
pursue|追求、从事
perceive|感知、认为
interpret|解释、理解
distinguish|区分、辨别
regard|认为、看待
consider|考虑、认为
emerge|出现、浮现
` },
  { name: '熟词僻义', icon: 'book', entries: `
issue|发行、发布；问题|issue a statement · 发布声明
subject|主题、研究对象；使遭受；科目|subject A to B · 使 A 遭受 B
object|反对、目标；物体|object to the proposal · 反对这项提议
account|解释、描述；账户|an account of events · 对事件的描述
address|处理、解决；地址|address a concern · 处理一个令人担忧的问题
figure|人物、认为；数字
term|术语、期限、条件；学期
article|物品、条款；文章
practice|惯例、实际做法；练习
approach|方法、途径；接近|an approach to the problem · 解决这个问题的方法
measure|措施；测量
means|手段、方法；意味着（mean 的第三人称单数）|by means of · 借助、通过
cause|事业、引起；原因
course|过程、进程；课程
interest|利益、利息；兴趣
position|立场、职位；位置
point|观点、要点；点
matter|有关系、重要；事情
concern|担忧、涉及；关心
state|状态、陈述；国家
note|注意到、指出；笔记
observe|遵守、评论；观察
appreciate|理解、意识到、感激；欣赏
respect|方面；尊重|in this respect · 在这一方面
charge|指控、负责；费用|in charge of · 负责……
credit|功劳、归功于；信用
capital|资本；首都
fine|罚款、精细的；好的
sound|合理的、可靠的；声音|a sound argument · 合理的论证
firm|公司、坚定的；坚固的
company|陪伴；公司
culture|培养、群体习惯；文化
rule|统治、裁定；规则
court|争取、招致；法院
scale|等级、比例；规模
settle|解决、确定；定居
bear|承受、承担；熊|bear the cost · 承担费用
yield|产生、屈服；产量
present|提出、呈现、当前的；礼物
content|满足的；内容|be content with · 对……感到满足
conduct|实施、进行；行为|conduct a study · 开展一项研究
current|水流、电流、趋势；当前的
striking|显著的、惊人的
profound|深远的、深刻的；深奥的
novel|新颖的；小说
modest|适度的、不大的；谦虚的|a modest increase · 小幅增长
discipline|学科；纪律
institution|制度；机构
exercise|行使、运用；锻炼|exercise power · 行使权力
fashion|方式、塑造；时尚|in a similar fashion · 以类似方式
` },
  { name: '社会与经济', icon: 'globe', entries: `
society|社会
social|社会的
economic|经济的
economy|经济、经济体
financial|金融的、财务的
corporate|企业的
corporation|公司、企业
industry|行业、工业
commercial|商业的
consumer|消费者
consumption|消费
investment|投资
employment|就业
unemployment|失业
labor|劳动力、劳动
wage|工资
income|收入
revenue|收入、财政收入
profit|利润
expenditure|支出
welfare|福利、福祉
poverty|贫困
inequality|不平等
policy|政策
authority|权威、当局
regulation|法规、监管
legislation|立法、法律
justice|公正、司法
judicial|司法的
legal|法律的、合法的
federal|联邦的
constitution|宪法、构成
reform|改革
executive|高管、行政的
administrative|行政的
discrimination|歧视、区别
diversity|多样性
individual|个人、个体的
collective|集体的
community|社区、群体
` },
  { name: '科研与教育', icon: 'flask', entries: `
research|研究
evidence|证据
experiment|实验
hypothesis|假设
theory|理论
phenomenon|现象
perspective|视角、观点
principle|原则、原理
concept|概念
framework|框架
mechanism|机制
cognitive|认知的
cognition|认知
perception|感知、看法
intelligence|智力、情报
intellectual|知识分子；知识的、智力的
consciousness|意识
behavior|行为
psychological|心理的
motivation|动机
instinct|本能
rational|理性的、合理的
emotional|情绪的
moral|道德的
ethical|伦理的
academic|学术的
innovation|创新
evolution|演变、进化
empirical|实证的、经验的
` },
  { name: '抽象名词', icon: 'layers', entries: `
implication|含义、潜在影响
consequence|后果
impact|影响、冲击
influence|影响
effect|效果、影响
factor|因素
tendency|倾向
trend|趋势
circumstance|情况、环境
context|背景、语境
criteria|标准（criterion 的复数）
capacity|能力、容量
potential|潜力、可能性
access|获得或使用的机会|have access to · 有机会获取或使用
outcome|结果
assumption|假设
recognition|认可、认识
awareness|意识
exposure|接触、暴露
expectation|期望
preference|偏好
incentive|激励、诱因
obstacle|障碍
burden|负担
limitation|局限性
responsibility|责任
obligation|义务
distinction|区别
conflict|冲突
controversy|争议
` },
  { name: '形容词与副词', icon: 'sliders', entries: `
significant|显著的、重要的
substantial|大量的、实质性的
considerable|相当大的
increasingly|日益、越来越
relatively|相对地|relatively · 相对地；completely · 完全地
particularly|尤其
primarily|主要地|primarily · 主要地；solely · 仅仅
merely|仅仅
solely|仅仅、独自
largely|在很大程度上
virtually|几乎、实际上
inevitably|不可避免地
necessarily|必然地|not necessarily · 未必
potentially|潜在地、可能地|留意选项是否把「可能」改成「一定」
apparently|显然、表面上
presumably|据推测
fundamentally|从根本上
deliberately|故意地
conventional|传统的
alternative|替代的、可供选择的
essential|必不可少的
indispensable|不可或缺的
adequate|足够的
sufficient|充分的
appropriate|合适的
relevant|相关的
effective|有效的
efficient|高效的
inherent|固有的、内在的
inevitable|不可避免的
` },
  { name: '核心短语', icon: 'link', entries: `
account for|解释、占……比例
result in|导致|A results in B · A 导致 B
result from|源于|A results from B · A 由 B 导致
lead to|导致
contribute to|促成、有助于
give rise to|引起、导致
stem from|源于
arise from|起因于
attribute A to B|把 A 归因于 B
be due to|由于
tend to|倾向于
be likely to|很可能
be supposed to|应当、被认为
be subject to|受到、受制于
be exposed to|接触、暴露于
be associated with|与……相关
be concerned with|涉及、与……有关
be concerned about|担忧
be responsible for|对……负责、是……的原因
be committed to|致力于
be based on|基于
be derived from|源于
rely on|依赖
depend on|取决于
focus on|集中于
appeal to|吸引、呼吁
refer to|指的是、提及
reflect on|反思
cope with|应对
deal with|处理
make sense of|理解
take into account|考虑到
take for granted|认为……理所当然
take advantage of|利用
give way to|让位于
make up|构成、编造
bring about|导致、带来
carry out|实施、执行
rule out|排除
point out|指出
turn out|结果证明
in terms of|就……而言
in the light of|根据、鉴于
in contrast to|与……形成对比
in favor of|支持、赞成
in response to|作为对……的回应
regardless of|不管、不顾
rather than|而不是
to some extent|在某种程度上
by no means|绝不
` }
];

const coreWords = `suggest indicate imply argue maintain acknowledge address attribute
contribute facilitate undermine restrict challenge advocate adopt adapt perceive interpret
distinguish skeptical cautious critical concerned objective ironic however nevertheless whereas
while despite instead therefore thus unless issue subject object account approach measure
means interest sound conduct exercise implication access significant primarily solely`
  .split(/\s+/);

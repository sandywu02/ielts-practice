// 單字資料庫
const rawWordList = [
    {w:"accurate", p:"/ˈækjərət/", m:"adj. 准确的，精确的"},
    {w:"acid", p:"/ˈæsɪd/", m:"n. 酸"},
    {w:"action", p:"/ˈækʃ(ə)n/", m:"n. 行动"},
    {w:"adult", p:"/ˈædʌlt; əˈdʌlt/", m:"n. 成年人"},
    {w:"adventure", p:"/ədˈventʃə(r)/", m:"n. 冒险（经历），奇遇"},
    {w:"age", p:"/eɪdʒ/", m:"n. 年龄，年纪"},
    {w:"agriculture", p:"/ˈæɡrɪkʌltʃə(r)/", m:"n. 农业，农学，农艺"},
    {w:"airline", p:"/ˈeəlaɪn/", m:"n. 航空公司"},
    {w:"airport", p:"/ˈeəpɔːt/", m:"n. 机场，航空站 （港）"},
    {w:"animal", p:"/ˈænɪm(ə)l/", m:"n. 动物"},
    {w:"apartment", p:"/əˈpɑːtmənt/", m:"n. 公寓套房"},
    {w:"application", p:"/ˌæplɪˈkeɪʃ(ə)n/", m:"n. 正式申请，书面申请"},
    {w:"art", p:"/ɑːt/", m:"n. 美术，艺术"},
    {w:"attitude", p:"/ˈætɪtjuːd/", m:"n. 态度，看法"},
    {w:"audience", p:"/ˈɔːdiəns/", m:"n. 观众，听众"},
    {w:"August", p:"/ɔːˈɡʌst/", m:"n. 八月"},
    {w:"aware", p:"/əˈweə(r)/", m:"adj. 知道的，明白的"},
    {w:"bacteria", p:"/bækˈtɪəriə/", m:"n. 细菌（bacterium的复数）"},
    {w:"balance", p:"/ˈbæləns/", m:"n. 平衡，均衡，均势"},
    {w:"balcony", p:"/ˈbælkəni/", m:"n. 露台，阳台"},
    // ... 請將你所有的單字按此格式放入 ...
    // ... 如果你不想自己整理，可以直接用上一個版本的 rawDataString ...
    // 為了方便你，我這裡寫一個自動轉換器，兼容你之前的 rawDataString
];

// 為了讓你不用手動改格式，我們用這段代碼來處理你之前那一長串字串
// 請將你之前提供的 rawDataString 完整貼在下面引號內
const fullRawString = `
accurate|/ˈækjərət/|adj. 准确的，精确的
acid|/ˈæsɪd/|n. 酸
action|/ˈækʃ(ə)n/|n. 行动
adult|/ˈædʌlt; əˈdʌlt/|n. 成年人
adventure|/ədˈventʃə(r)/|n. 冒险（经历），奇遇
age|/eɪdʒ/|n. 年龄，年纪
agriculture|/ˈæɡrɪkʌltʃə(r)/|n. 农业，农学，农艺
airline|/ˈeəlaɪn/|n. 航空公司
airport|/ˈeəpɔːt/|n. 机场，航空站 （港）
animal|/ˈænɪm(ə)l/|n. 动物
apartment|/əˈpɑːtmənt/|n. 公寓套房
application|/ˌæplɪˈkeɪʃ(ə)n/|n. 正式申请，书面申请
art|/ɑːt/|n. 美术，艺术
attitude|/ˈætɪtjuːd/|n. 态度，看法
audience|/ˈɔːdiəns/|n. 观众，听众
August|/ɔːˈɡʌst/|n. 八月
aware|/əˈweə(r)/|adj. 知道的，明白的
bacteria|/bækˈtɪəriə/|n. 细菌（bacterium的复数）
balance|/ˈbæləns/|n. 平衡，均衡，均势
balcony|/ˈbælkəni/|n. 露台，阳台
band|/bænd/|n. 乐队
bank|/bæŋk/|n. 银行
baseball|/ˈbeɪsbɔːl/|n. 棒球
bay|/beɪ/|n. （海或湖的）湾
beach|/biːtʃ/|n. 海滩，海滨
beginners|/bɪˈɡɪnəz/|n. 新手;初学者（beginner的复数）
behaviour|/bɪˈheɪvjə(r)/|n. 行为，举止，态度
bicycle|/ˈbaɪsɪk(ə)l/|n. 单车，自行车
bike|/baɪk/|n. 自行车，脚踏车，单车
bird|/bɜːd/|n. 鸟
bones|/bəʊnz/|n. 骨骼；身体；争议点（bone的复数）
books|/bʊks/|n. 书籍（book 的复数）
boots|/buːts/|n. 靴子（boot 的复数）
brain|/breɪn/|n. 脑
breakfast|/ˈbrekfəst/|n. 早餐
breathing|/ˈbriːðɪŋ/|n. 呼吸，呼吸声
bridge|/brɪdʒ/|n. 桥
business|/ˈbɪznəs/|n. 商业，买卖，生意
cafe|/ˈkæfeɪ/|n. 咖啡馆
cake|/keɪk/|n. 蛋糕；块状物
camp|/kæmp/|n. 营地
campus|/ˈkæmpəs/|n. （大学或学院的）校园
carbon|/ˈkɑːbən/|n. 碳
castle|/ˈkɑːs(ə)l/|n. 城堡，堡垒
cattle|/ˈkæt(ə)l/|n. 牛
cave|/keɪv/|n. 洞穴，山洞
central|/ˈsentrəl/|adj. 中央的，中心的
certificate|/səˈtɪfɪkət/|n. 证明，证书
cheese|/tʃiːz/|n. 芝士，奶酪
chemical|/ˈkemɪk(ə)l/|adj. 化学的，与化学有关的
childhood|/ˈtʃaɪldhʊd/|n. 童年，幼年时代
children|/ˈtʃɪldrən/|n. 孩子们（child 的复数）
chocolate|/ˈtʃɒklət/|n. 巧克力，朱古力
cinema|/ˈsɪnəmə/|n. 电影院
city|/ˈsɪti/|n. 城市，都市
clay|/kleɪ/|n. 黏土，陶土
climate|/ˈklaɪmət/|n. 气候
climbing|/ˈklaɪmɪŋ/|n. 登山，攀岩
clothing|/ˈkləʊðɪŋ/|n. 衣服，（尤指某种）服装
clouds|/klaʊdz/|n. 云彩，白云（cloud 复数形式）
club|/klʌb/|n. 俱乐部，社团
coach|/kəʊtʃ/|n. 教练
coast|/kəʊst/|n. 海岸，海滨
coins|/kɔɪnz/|n. 硬币（coin 的复数）
college|/ˈkɒlɪdʒ/|n. 大学，专科学校
colour|/ˈkʌlə(r)/|n. 颜色
communication|/kəˌmjuːnɪˈkeɪʃ(ə)n/|n. 表达，交流，交际
competition|/ˌkɒmpəˈtɪʃ(ə)n/|n. 竞争
complex|/ˈkɒmpleks/|adj. 复杂的，难懂的
computer|/kəmˈpjuːtə(r)/|n. 计算机
concrete|/ˈkɒŋkriːt/|adj. 确实的，具体的；n. 混凝土
conference|/ˈkɒnfərəns/|n. （大型、正式的）会议，研讨会
confident|/ˈkɒnfɪdəns/|adj. 自信的，充满信心的
confusion|/kənˈfjuːʒn/|n. 困惑，不明确
contract|/ˈkɒntrækt; kənˈtrækt/|n. 合同，契约
control|/kənˈtrəʊl/|n. 控制
cook|/kʊk/|v. 做饭，烹调；n. 厨师，炊事员
creativity|/ˌkriːeɪˈtɪvəti/|n. 创造力，独创性
culture|/ˈkʌltʃə(r)/|n. 文化，文明
cycling|/ˈsaɪklɪŋ/|n. 骑自行车
dance|/dɑːns/|v. 跳舞
dangerous|/ˈdeɪndʒərəs/|adj. 危险的，有威胁的
dark|/dɑːk/|adj. 黑暗的，昏暗的
database|/ˈdeɪtəbeɪs/|n. （计算机）数据库，资料库
day|/deɪ/|n. 一天
deliveries|/dɪˈlɪvərɪz/|n. 递送（delivery 的复数）
dentist|/ˈdentɪst/|n. 牙科医生
depth|/depθ/|n. 深度，纵深
diary|/ˈdaɪəri/|n. 日记
diet|/ˈdaɪət/|n. 规定饮食
dinner|/ˈdɪnə(r)/|n. 正餐，晚餐
disease|/dɪˈziːz/|n. 疾病，病害
distance|/ˈdɪstəns/|n. 远处
diving|/ˈdaɪvɪŋ/|n. 跳水，跳水运动
documentation|/ˌdɒkjumenˈteɪʃn/|n. 证明文件，凭证
dogs|/dɒɡz/|n. 狗（dog 的复数）
drama|/ˈdrɑːmə/|n. 剧本，戏剧
drive|/draɪv/|v. 驾车
dry|/draɪ/|adj. 干的
eat|/iːt/|v. 吃，吃饭
electricity|/ɪˌlekˈtrɪsəti/|n. 电，电流，电力
employment|/ɪmˈplɔɪmənt/|n. 雇用
endangered|/ɪnˈdeɪndʒəd/|adj. （动植物）濒危的
energy|/ˈenədʒi/|n. 能力，力气
engineering|/ˌendʒɪˈnɪərɪŋ/|n. 工程，工程学
English|/ˈɪŋɡlɪʃ/|adj. 英文的
entertainment|/ˌentəˈteɪnmənt/|n. 娱乐，娱乐表演
entrance|/ˈentrəns/|n. 入口，进口
environment|/ɪnˈvaɪrənmənt/|n. 自然环境，生态环境
equipment|/ɪˈkwɪpmənt/|n. 设备，用具
evening|/ˈiːvnɪŋ/|n. 晚上，傍晚
examples|/ɪɡˈzæmpl/|n. 例子
expensive|/ɪkˈspensɪv/|adj. 花钱多的，昂贵的
experience|/ɪkˈspɪəriəns/|n. 经历，往事
face|/feɪs/|n. 脸，面部
factory|/ˈfæktri; ˈfæktəri/|n. 工厂，制造厂
family|/ˈfæməli/|n. 家，家庭
farming|/ˈfɑːmɪŋ/|n. 农业，农场经营
fear|/fɪə(r)/|v. 害怕，畏惧
feathers|/ˈfeðər/|n. 羽毛（feather 的复数）
feedback|/ˈfiːdbæk/|n. 反馈意见
feeding|/ˈfiːdɪŋ/|n. 饲养
fertility|/fəˈtɪləti/|n. 肥沃，富饶
film|/fɪlm/|n. 电影，影片
fire|/ˈfaɪə(r)/|n. 失火，火灾
fishing|/ˈfɪʃɪŋ/|n. 钓鱼，捕鱼
flavor|/ˈfleɪvə(r)/|n. 情味，风味
flexible|/ˈfleksəb(ə)l/|adj. 灵活的
flight|/flaɪt/|n. 航班，班机
floor|/flɔː(r)/|n. （房间的）地板，地面
flu|/fluː/|n. 流行性感冒，流感
food|/fuːd/|n. （植物生长的）养料
forest|/ˈfɒrɪst/|n. 森林，林区
fountain|/ˈfaʊntən; ˈfaʊntɪn/|n. 喷泉
France|/frɑːns/|n. 法国
freedom|/ˈfriːdəm/|n. 自由权，自主权
Friday|/ˈfraɪdeɪ/|n. 星期五
fridge|/frɪdʒ/|n. 冰箱
frozen|/ˈfrəʊz(ə)n/|adj. 结冰的，冻硬的
fuel|/ˈfjuːəl/|n. 燃料，燃烧剂
fun|/fʌn/|n. 乐趣，享受
furniture|/ˈfɜːnɪtʃə(r)/|n. 家具
garage|/ˈɡærɑːʒ/|n. 车库
garden|/ˈɡɑːd(ə)n/|n. 花园，菜园，果园
gender|/ˈdʒendə(r)/|n. 性别
genetic|/dʒəˈnetɪk/|adj. 基因的，遗传学的
gift|/ɡɪft/|n. 礼物，赠品
glass|/ɡlɑːs/|n. 玻璃
gold|/ɡəʊld/|n. 金
golf|/ɡɒlf/|n. 高尔夫球运动
grandparents|/ˈɡrænpeərənts/|n. 祖父母
grass|/ɡrɑːs/|n. 草
group|/ɡruːp/|n. 集体，团体
guide|/ɡaɪd/|v. 带领，引导（某人至某地）
handout|/ˈhændaʊt/|n. 讲义
harbour|/ˈhɑːbə(r)/|n. 港口
hard|/hɑːd/|adj. 硬的，坚固的
hat|/hæt/|n. （常指带檐的）帽子
healthy|/ˈhelθi/|adj. 健康的，健壮的
heart|/hɑːt/|n. 心，心脏
heavy|/ˈhevi/|adj. 重的，沉的
helicopter|/ˈhelɪkɒptə(r)/|n. 直升机
helmet|/ˈhelmɪt/|n. 头盔，安全帽
history|/ˈhɪstri; ˈhɪstəri/|n. 历史
holidays|/ˈhɒlədeɪz/|adv. 每逢假日，在假日
hospital|/ˈhɒspɪt(ə)l/|n. 医院
hotel|/həʊˈtel/|n. 旅馆，酒店，饭店
house|/haʊs/|n. 房子，住宅
hunting|/ˈhʌntɪŋ/|n. 打猎，狩猎
ice|/aɪs/|n. 冰
immune|/ɪˈmjuːn/|adj. 免疫的
India|/ˈɪndiə/|n. 印度
information|/ˌɪnfəˈmeɪʃ(ə)n/|n. 消息，资料，情报
ink|/ɪŋk/|n. 墨水，油墨
insects|/ˈɪnsekts/|n. 昆虫
instinctive|/ɪnˈstɪŋktɪv/|adj. 本能的，直觉的
insurance|/ɪnˈʃʊərəns/|n. 保险
intelligent|/ɪnˈtelɪdʒənt/|adj. 聪明的
international|/ˌɪntəˈnæʃ(ə)nəl/|adj. 国际的，国际上的
internet|/ˈɪntənet/|n. 互联网，因特网（=the Internet）
interview|/ˈɪntəvjuː/|v. 面试，面谈
iron|/ˈaɪən/|n. 铁
irrigation|/ˌɪrɪˈɡeɪʃ(ə)n/|n. 灌溉
jobs|/dˈʒɒbz/|n. 工作（job 的复数形式）
journalism|/ˈdʒɜːnəlɪz(ə)m/|n. 新闻业，新闻工作
July|/dʒʊˈlaɪ/|n. 七月
kidney|/ˈkɪdni/|n. 肾，肾脏
kitchen|/ˈkɪtʃɪn/|n. 厨房
labor|/ˈleɪbə(r)/|n. 劳动
lake|/leɪk/|n. 湖，湖泊
lamps|/læmps/|n. 灯具（lamp 的复数）
language|/ˈlæŋɡwɪdʒ/|n. 语言，语言文字
larger|/ˈlɑ:dʒə(r)/|adj. 大的
late|/leɪt/|adj. 晚期的，末期的
laundry|/ˈlɔːndri/|n. 待洗（或正在洗涤、洗完）的衣物
leader|/ˈliːdə(r)/|n. 领导者，首领
leadership|/ˈliːdəʃɪp/|n. 领导，领导地位
letter|/ˈletə(r)/|n. 信，信函
library|/ˈlaɪbrəri/|n. 图书馆，藏书楼
license|/ˈlaɪs(ə)ns/|n. 执照，许可证
light|/laɪt/|n. 光，光线
link|/lɪŋk/|v. 连接
local|/ˈləʊk(ə)l/|adj. 当地的，地方的
location|/ləʊˈkeɪʃn/|n. 地点，位置
lock|/lɒk/|v. 锁住，把……锁起来
logic|/ˈlɒdʒɪk/|n. 逻辑，（做某事的）道理
logo|/ˈləʊɡəʊ/|n. （公司或组织的）标识，徽标
loss|/lɒs/|n. 失去，丧失
lunch|/lʌntʃ/|n. 午餐，午饭
magazines|/ˈmæɡəzi:nz/|n. 杂志（magazine 的复数）
mail|/meɪl/|n. 邮政，邮递系统
male|/meɪl/|adj. 男性的
manager|/ˈmænɪdʒə(r)/|n. （公司、部门等的）经理
map|/mæp/|n. 地图
March|/mɑːtʃ/|n. 三月
market|/ˈmɑːkɪt/|n. 集市，市场
materials|/məˈtɪəriəlz/|n. 衣料，布料
math|/mæθ/|n. 数学（等于 mathematics）
mature|/məˈtʃʊə(r)/|adj. 成熟的，理智的
meat|/miːt/|n. 肉类，（某种）食用肉
media|/ˈmiːdiə/|n. 新闻媒体，传媒（medium的复数形式）
medical|/ˈmedɪk(ə)l/|adj. 医学的，医疗的
medicine|/ˈmedsn; ˈmedɪsn/|n. 药物，药剂
metal|/ˈmet(ə)l/|n. 重金属音乐
microwave|/ˈmaɪkrəweɪv/|n. 微波炉
middle|/ˈmɪd(ə)l/|adj. 中间的，中等的
migrate|/maɪˈɡreɪt/|v. （候鸟或动物）迁徙
migration|/maɪˈɡreɪʃn/|n. 移民，迁徙
milk|/mɪlk/|n. （牛或羊等的）奶
minerals|/ˈmɪnərəlz/|n. 矿物
mirror|/ˈmɪrə(r)/|n. 镜子
mistake|/mɪˈsteɪk/|n. 错误，过失
moderate|/ˈmɒdərət/|adj. 普通的，中等的
money|/ˈmʌni/|n. 钱，钞票，货币
monkeys|/ ˈmʌŋkiz /|n. 猴子（monkey 的复数）
month|/mʌnθ/|n. 月，月份
mountain|/ˈmaʊntən/|n. 山，高山
movement|/ˈmuːvmənt/|n. 移动，转移
movies|/mu:vɪz/|n. 电影（movie 的复数）
mud|/mʌd/|n. 泥，淤泥，泥浆
museum|/mjuˈziːəm/|n. 博物馆
music|/ˈmjuːzɪk/|n. 音乐，乐曲
myth|/mɪθ/|n. 神话；虚构的人
name|/neɪm/|n. 名字，名称
nature|/ˈneɪtʃə(r)/|n. 大自然，自然界
negative|/ˈneɡətɪv/|adj. 有害的，负面的
nest|/nest/|n. 窝，巢，穴
nets|/nets/|n. 网（net的复数）
network|/ˈnetwɜːk/|n. 网络，网状系统
new|/njuː/|adj. 新的，新鲜的
newspaper|/ˈnjuːzpeɪpə(r)/|n. 报纸，报
night|/naɪt/|n. 夜间，夜晚
noise|/nɔɪz/|n. 噪音，嘈杂声
northeast|/ˌnɔːθˈiːst/|n. 东北方，东北部
November|/nəʊˈvembə(r)/|n. 十一月
numbers|/ˈnʌmbəz/|n. 数字（number的复数）
nurse|/nɜːs/|n. 护士
nuts|/nʌts/|n. 干果, 坚果（nut的复数）
observation|/ˌɒbzəˈveɪʃ(ə)n/|n. 观察，监视
ocean|/ˈəʊʃ(ə)n/|n. 海洋，大海
October|/ɒkˈtəʊbə(r)/|n. 十月
office|/ˈɒfɪs/|n. 办公室
oil|/ɔɪl/|n. 燃油，润滑油
online|/ˌɒnˈlaɪn/|adj. 在线的，网上的
open|/ˈəʊpən/|adj. 开放的，营业的
orange|/ˈɒrɪndʒ/|n. 橙，柑橘
organic|/ɔːˈɡænɪk/|adj. 有机的，绿色的
organization|/ˌɔːɡənaɪˈzeɪʃn/|n. 组织，机构
outside|/ˌaʊtˈsaɪd/|n. 外表，外部
ovens|/ˈʌvnz/|n. 烤箱（oven 的复数形式）
oxygen|/ˈɒksɪdʒən/|n. 氧，氧气
pain|/peɪn/|n. 疼痛，伤痛
paper|/ˈpeɪpə(r)/|n. 纸
parents|/ˈpeərənts/|n. 父母
park|/pɑːk/|n. 公园
partner|/ˈpɑːtnə(r)/|n. 搭档，同伴
passive|/ˈpæsɪv/|adj. 消极的，被动的
passport|/ˈpɑːspɔːt/|n. 护照
pattern|/ˈpæt(ə)n/|n. 模式，方式
payment|/ˈpeɪmənt/|n. 支付款项，支付额
pencil|/ˈpens(ə)l/|n. 铅笔
perfume|/ˈpɜːfjuːm/|n. 香水
personal|/ˈpɜːsən(ə)l/|adj. 个人的，私人的
personality|/ˌpɜːsəˈnæləti/|n. 个性，性格
phone|/fəʊn/|n. 电话，电话系统
photo|/ˈfəʊtəʊ/|n. 照片
photocopy|/ˈfəʊtəʊkɒpi/|n. 复印件
photographs|/ˈfəʊ.tə.grɑːfs/|n. 照片
piano|/piˈænəʊ/|n. 钢琴
picture|/ˈpɪktʃə(r)/|n. 图片，绘画
plants|/plɑːnts/|n. 植物（plant的复数形式）
plastic|/ˈplæstɪk/|n. 塑料
platforms|/ˈplætfɔːms/|n. 月台，站台（platform的复数）
play|/pleɪ/|v. 玩，玩耍
playground|/ˈpleɪɡraʊnd/|n. 操场，游乐场
political|/pəˈlɪtɪk(ə)l/|adj. 政治（上）的，政府的
politics|/ˈpɒlətɪks/|n. 政治，政治活动（事务）
pollution|/pəˈluːʃ(ə)n/|n. 污染
pool|/puːl/|n. 游泳池
post|/pəʊst/|n. <英>邮政，邮递
poster|/ˈpəʊstə(r)/|n. 海报，招贴画
pottery|/ˈpɒtəri/|n. 陶器
poverty|/ˈpɒvəti/|n. 贫穷，贫困
power|/ˈpaʊə(r)/|n. 控制力，操控力
printer|/ˈprɪntə(r)/|n. 打印机
privacy|/ˈprɪvəsi/|n. 隐私，秘密
problems|/ˈprɔ:bləmz/|n. 问题；难题（problem的复数）
quality|/ˈkwɒntəti/|n. 质量，品质
radio|/ˈreɪdiəʊ/|n. 收音机
rain|/reɪn/|n. 雨，雨水
rats|/ræts/|n. 鼠；卑鄙之人（rat 的复数）
reading|/ˈriːdɪŋ/|n. 阅读，宣读
reception|/rɪˈsepʃ(ə)n/|n. 接待处，服务台
reference|/ˈrefrəns/|n. 提及，谈到
reflective|/rɪˈflektɪv/|adj. 反射的，反光的
relationships|/rɪˈleʃənˈʃɪp/|n. 关系, 联系（relationship的复数）
relative|/ˈrelətɪv/|n. 亲戚，亲属
report|/rɪˈpɔːt/|n. 报告，汇报
reproduction|/ˌriːprəˈdʌkʃn/|n. 生殖，繁殖
research|/rɪˈsɜːtʃ/|n. 研究，探讨
restaurant|/ˈrestrɒnt/|n. 餐馆，饭店
retail|/ˈriːteɪl/|n. 零售
review|/rɪˈvjuː/|n. 审查，检查
rice|/raɪs/|n. 稻
river|/ˈrɪvə(r)/|n. 河，江
roads|/rəʊdz/|n.道路（road 的复数）
rock|/rɒk/|n. 岩石
roof|/ruːf/|n. 屋顶，车顶
roots|/ruːts/|n. 根（root的复数）
rope|/rəʊp/|n. 粗绳，绳索
round|/raʊnd/|adj. 圆形的，球形的
rumor|/ˈruːmə(r)/|n. 谣言
running|/ˈrʌnɪŋ/|n. 跑步，赛跑
rural|/ˈrʊərəl/|adj. 农村的，乡村的
sad|/sæd/|adj. 伤心的，难过的
safety|/ˈseɪfti/|n. 安全
sailing|/ˈseɪlɪŋ/|n. 航行，航海；启航
sales|/ˈseɪlz/|n. 销售（sale 的复数）；销售额
salt|/sɔːlt/|n. 盐，食盐
sand|/sænd/|n. 沙，沙子
Saturday|/ˈsætədeɪ/|n. 星期六
school|/skuːl/|n. 学校
science|/ˈsaɪəns/|n. 科学，科学知识
scientists|/ˈsaɪəntɪsts/|n. 科学家（scientist 的复数）
screen|/skriːn/|n. 屏幕，荧光屏
seafood|/ˈsiːfuːd/|n. 海鲜
secondary|/ˈsekənd(ə)ri/|adj. （教育）中等的，中学的
security|/sɪˈkjʊərəti/|n. 保护措施，安全工作
seed|/siːd/|n. 种子，籽
September|/sepˈtembə(r)/|n. 九月
services|/ˈsɜːvɪsɪz/|n. 服务
shade|/ʃeɪd/|n. 背阴处，阴凉处
shape|/ʃeɪp/|n. 形状，外形
sharing|/ˈʃeərɪŋ/|n. 公用，共享
sharks|/ʃɑːks/|n. 鲨鱼（shark 的复数形式）
shells|/ʃelz/|n. 贝壳（shell 的复数）
ship|/ʃɪp/|n. （大）船，舰
shoes|/ˈʃu:z/|n. 鞋子（shoe 的复数）
shopping|/ˈʃɒpɪŋ/|n. 购物
shoulders|/ˈʃəʊl.dəz/|n. 肩膀（shoulder 的复数）
shower|/ˈʃaʊə(r)/|n. 淋浴器，花洒
silk|/sɪlk/|n. 丝绸，丝线
silver|/ˈsɪlvə(r)/|n. 银
singing|/ˈsɪŋɪŋ/|n. 歌唱
size|/saɪz/|n. 大小，尺寸
skills|/ˈskɪlz/|n. 技术，技能（skill 的复数）
skin|/skɪn/|n. 皮，皮肤
sky|/skaɪ/|n. 天，天空
slaves|/sleɪvz/|n. 奴隶（slave的复数）
sleep|/sliːp/|v. 睡，睡觉
smell|/smel/|n. 气味
smile|/smaɪl/|v. 微笑
social|/ˈsəʊʃ(ə)l/ |adj. 社会的
soft|/sɒft/|adj. 易弯曲的，柔软的
software|/ˈsɒftweə(r)/|n. 软件
soil|/sɔɪl/|n. 泥土，土壤
songs|/sɔːŋz/|n. 歌曲，歌集（song 的复数）
sound|/saʊnd/|n. 声音，声响
space|/speɪs/|n. 空间，空地
Spanish|/ ˈspænɪʃ /|adj. 西班牙的；西班牙人的
speech|/spiːtʃ/|n. 演说，发言，谈话
speed|/spiːd/|n. （运动）速度
spices|/sˈpaɪsɪz/|n. 香味料，调味料（spice 的复数）
spiders|/ˈspaɪdə(r)z/|n. 蜘蛛（spider的复数）
sport|/spɔːt/|n. 体育运动
spring|/sprɪŋ/|n. 春天，春季
square|/skweə(r)/|adj. 正方形的，四方形的
stage|/steɪdʒ/|n. 阶段，时期
station|/ˈsteɪʃ(ə)n/|n. 车站
statistics|/stəˈtɪstɪks/|n. 统计学
steam|/stiːm/|n. 蒸汽，水蒸气
stone|/stəʊn/|n 石头，石料
storm|/stɔːm/|n. 暴风雨，暴风雪，风暴
story|/ˈstɔːri/|n. （真实或虚构的）故事，叙述
strength|/streŋθ/|n. 体力，力量
stress|/stres/|n. 精神压力，紧张
string|/strɪŋ/|n. 线，细绳，带子
studio|/ˈstjuːdiəʊ/|n. 录音室，播音室，演播室
study|/ˈstʌdi/|n. 学习，研究；课题
style|/staɪl/|n. 方式，作风
sugar|/ˈʃʊɡə(r)/|n. 食糖
summer|/ˈsʌmə(r)/|n. 夏天，夏季
sun|/sʌn/|n. 太阳（the sun）
Sunday|/ˈsʌndeɪ/|n. 星期日
supermarket|/ˈsuːpəmɑːkɪt/|n. 超级市场，超市
support|/səˈpɔːt/|v. 支持，拥护，鼓励
surface|/ˈsɜːfɪs/|n. 表面
survival|/səˈvaɪv(ə)l/|n. 继续生存，存活，幸存
sweetener|/ˈswiːtnə(r)/|n. 甜料
swimming|/ˈswɪmɪŋ/|n. 游泳
tails|/teɪlz/|n. 尾部（tail 的复数形式）
talent|/ˈtælənt/|n. 天赋，才能
taste|/teɪst/|n. 味道，滋味
tax|/tæks/|n. 税款
taxi|/ˈtæksi/|n. 出租车，计程车，的士
teacher|/ˈtiːtʃə(r)/|n. 教师
technical|/ˈteknɪk(ə)l/|adj. 工艺的，技术的
technology|/tekˈnɒlədʒi/|n. 科技，技术
teeth|/tiːθ/|n. 牙齿（tooth的复数形式）
temperature|/ˈtemprətʃə(r)/|n. 温度，气温
temporary|/ˈtemprəri/|adj. 暂时的，临时的
tennis|/ˈtenɪs/|n. 网球
tent|/tent/|n. 帐篷
third|/θɜːd/|num. 第三
threat|/θret/|n. 威胁，恐吓
Thursday|/ˈθɜːzdeɪ/|n. 星期四
time|/taɪm/|n. 时间
timetable|/ˈtaɪmteɪb(ə)l/|n. 时间表
tools|/tuːlz/|n. 工具（tool的复数形式）
top|/tɒp/|n. 顶部，顶端，上端
tourists|/ˈtʊərɪsts/|n. 旅游者（tourist的复数）
towel|/ˈtaʊəl/|n. 毛巾，手巾
tower|/ˈtaʊə(r)/|n. 塔，塔楼
toys|/tɒɪz/|n. 玩具（toy 的复数）
trade|/treɪd/|n. 贸易，买卖
traditional|/trəˈdɪʃən(ə)l/|adj. 传统的
traffic|/ˈtræfɪk/|n. 路上行驶的车辆，交通
training|/ˈtreɪnɪŋ/|n. 训练，培训
transport|/ˈtrænspɔːt/|n. 运输，运送
trash|/træʃ/|n. 垃圾，废物
travel|/ˈtræv(ə)l/|v. 旅行
tree|/triː/|n. 树
triangle|/ˈtraɪæŋɡ(ə)l/|n. 三角形
tube|/tjuːb/|n. 管，管子
Tuesday|/ˈtjuːzdeɪ/|n. 星期二
tutor|/ˈtjuːtə(r)/|n. 家庭教师，私人教师
uncomfortable|/ʌnˈkʌmftəb(ə)l/|adj. 身体不适的，感到不舒服的
uniform|/ˈjuːnɪfɔːm/|n. 制服，校服
university|/ˌjuːnɪˈvɜːsəti/|n. 大学，综合性大学
varied|/ˈveərid/|adj. 各种各样的，形形色色的
vegetarian|/ˌvedʒəˈteəriən/|n. 素食者，素食主义者
view|/vjuː/|n. 观点，看法
village|/ˈvɪlɪdʒ/|n. 乡村，村庄
virus|/ˈvaɪrəs/|n. 病毒
visa|/ˈviːzə/|n. 签证
vision|/ˈvɪʒn/|n. 视力；眼力
volcano|/vɒlˈkeɪnəʊ/|n. 火山
waiter|/ˈweɪtə(r)/|n. 服务员，侍者
walking|/ˈwɔːkɪŋ/|n. 步行
wall|/wɔːl/|n. 城墙，围墙
warm|/wɔːm/|adj. 暖和的，温暖的
warnings|/ˈwɔː.nɪŋz/|n. 警告信息（warning 的复数形式）
waste|/weɪst/|n. 浪费，滥用
water|/ˈwɔːtə(r)/|n. 水，雨水
waterfall|/ˈwɔːtəfɔːl/|n. 瀑布
waterproof|/ˈwɔːtəpruːf/|adj. 防水的，不透水的
wax|/ wæks /|n. 蜡，蜂蜡
weather|/ˈweðə(r)/|n. 天气，气象
website|/ˈwebsaɪt/|n. 网站
wedding|/ˈwedɪŋ/|n. 婚礼，结婚庆典
weeds|/wiːdz/|n. 野草（weed 的复数形式）
week|/wiːk/|n. 星期，周
weekend|/ˌwiːkˈend; ˈwiːkend/|n. 周末
weight|/weɪt/|n. 重量，分量，体重
west|/west/|n. 西，西方
whales|/weɪlz/|n. 鲸鱼（whale 的复数）
whistle|/ˈwɪs(ə)l/|n. 哨子
wild|/waɪld/|adj. （动植物）自然生长的，野生的
wind|/wɪnd/|n. 风，气流
windows|/ˈwɪndəʊz/|n. 窗户
winter|/ˈwɪntə(r)/|n. 冬季
women|/ˈwɪmɪn/|n. 女人（woman 的复数）
wood|/wʊd/|n. 木材，木料，木头
words|/wɜːdz/|n. 字（word 的复数）
work|/wɜːk/|n. 工作，职业
world|/wɜːld/|n. 世界，地球，天下
writers|/ˈraɪtər/|n. 作家；作者（writer的复数）
yoga|/ˈjəʊɡə/|n. 瑜伽，瑜伽术
youth|/juːθ/|n. 青少年时期
accidents|/ˈæksɪdənts/|n. 事故（accident 的复数）
activities|/ækˈtɪvətiz/|n. 行动
actors|/ˈæktəz/|n. 演员，男演员
address|/əˈdres/|n. 地址，住址
advertisements|/ədˈvɜːtɪsmənts/|n. 广告（advertisement 的复数）
advertising|/ˈædvətaɪzɪŋ/|n. 广告活动，广告业
air|/eə(r)/|n. 大气，空气
alarm|/əˈlɑːm/|n. 警报
alternative|/ɔːlˈtɜːnətɪv/|n. 可供选择的事物，替代物
answer|/ˈɑːnsə(r)/|v. 回答，答复
April|/ˈeɪprəl/|n. 四月
apron|/ˈeɪprən/|n. 围裙
ash|/æʃ/|n. （香烟或木头等的）灰
autumn|/ˈɔːtəm/|n. 秋天，秋季
back|/bæk/|n. 后面，后部
background|/ˈbækɡraʊnd/|n. 出身背景，学历，经历
bakery|/ˈbeɪkəri/|n. 面包店
ball|/bɔːl/|n. 球，球状物
bargain|/ˈbɑːɡən/|n. 便宜货，减价品
base|/beɪs/|n. 根基，底部
basement|/ˈbeɪsmənt/|n. 地下室，地库
bathroom|/ˈbɑːθruːm; ˈbɑːθrʊm/|n. 浴室，盥洗室
beginning|/bɪˈɡɪnɪŋ/|n. 开始，开端
benefits|/ˈbenɪfɪts/|n. 利益，好处
biology|/baɪˈɒlədʒi/|n. 生物学
blind|/blaɪnd/|adj. 失明的，盲的
blood|/blʌd/|n. 血，血液
booklet|/ˈbʊklət/|n. 小册子
bookshop|/ˈbʊkʃɒp/|n. 书店
bored|/bɔːd/|adj. 无聊的，厌倦的
boxes|/ˈbɒksɪz/|n. 小木箱，盒子
brick|/brɪk/|n. 砖，砖块
buried|/ˈberid/|adj. 埋葬的
bus|/bʌs/|n. 公共汽车
calendar|/ˈkælɪndə(r)/|n. 日历
camel|/ˈkæm(ə)l/|n. 骆驼
camera|/ˈkæm(ə)rə/|n. 照相机
candles|/ˈkænd(ə)ls/|n. 蜡烛（candle 复数形式）
card|/kɑːd/|n. 银行卡，身份证
cargo|/ˈkɑːɡəʊ/|n. 货物
carnival|/ˈkɑːnɪv(ə)l/|n. 狂欢节，嘉年华会
cars|/kɑːz/|n. 车（car的复数）
cash|/kæʃ/|n. 现款，现金
catch|/kætʃ/|v. 接住
chairman|/ˈtʃeəmən/|n. 主席，负责人
change|/tʃeɪndʒ/|v. 改变，变化
cheap|/tʃiːp/|adj. 便宜的，廉价的
cheaper|/tʃiːpə/|adj. 比较便宜的
chemist|/ˈkemɪst/|n. 化学家
cheque|/tʃek/|n. 支票
chicken|/ˈtʃɪkɪn/|n. 鸡
Chinese|/ˌtʃaɪˈniːz/|adj. 中国的
choosing|/tʃuːzɪŋ/|v. 选择，挑选
churches|/tʃɜːtʃɪz/|n. 教会，教堂（church 的复数形式）
circle|/ˈsɜːk(ə)l/|n. 圆，圆形物
classification|/ˌklæsɪfɪˈkeɪʃ(ə)n/|n. 分类，分级
clocks|/klɒks/|n. 钟表
closed|/kləʊzd/|adj. 关着的，闭合的
code|/kəʊd/|n. 密码，暗码
coffee|/ˈkɒfi/|n. 咖啡
collector|/kəˈlektə(r)/|n. 收藏家
colony|/ˈkɒləni/|n. 殖民地
comedy|/ˈkɒmədi/|n. 喜剧，喜剧片
commercial|/kəˈmɜːʃ(ə)l/|adj. 商业的，商务的
common|/ˈkɒmən/|adj. 共同的，共享的
companionship|/kəmˈpænjənʃɪp/|n. 情谊，友谊
compensation|/ˌkɒmpenˈseɪʃ(ə)n/|n. 赔偿金，补偿金
composing|/kəmˈpəʊzɪŋ/|n. 组成
compulsory|/kəmˈpʌlsəri/|adj. 必须做的，义务的，强制的
concentration|/ˌkɒns(ə)nˈtreɪʃ(ə)n/|n. 专心，专注
concert|/ˈkɒnsət/|n. 音乐会，演奏会
confirmation|/ˌkɒnfəˈmeɪʃ(ə)n/|n. 确认，確定
connected|/kəˈnektɪd/|adj. 连接的，相连的，相通的
conservation|/ˌkɒnsəˈveɪʃ(ə)n/|n. 保护，保存
convenient|/kənˈviːniənt/|adj. 方便的，便利的
cookery|/ˈkʊkəri/|n. 烹饪，烹调术，烹调业
cooking|/ˈkʊkɪŋ/|n. 烹饪，烹调
corporate|/ˈkɔːpərət/|adj. 公司的
cost|/kɒst/|n. 价钱，费用
cost-effective|/ˌkɒst ɪˈfektɪv/|adj. 划算的
cotton|/ˈkɒtn/|n. 棉，棉花
cousin|/ˈkʌz(ə)n/|n. 堂（表）兄弟/姐妹
cracks|/kræks/|n. 裂缝，裂纹
cream|/kriːm/|n. 奶油，乳脂
crowded|/ˈkraʊdɪd/|adj. 拥挤的，塞满的
cup|/kʌp/|n. 杯子
customers|/ˈkʌstəməz/|n. 客户
dancing|/ˈdɑːnsɪŋ/|n. 跳舞
data|/ˈdeɪtə/|n. 数据，资料
decorations|/ˌdekəˈreɪʃənz/|n. 装饰品（decoration 的复数）
definition|/ˌdefɪˈnɪʃ(ə)n/|n. 定义，释义
density|/ˈdensəti/|n. 稠密，密集
deposit|/dɪˈpɒzɪt/|v. 放下，放置
desert|/ˈdezət/|n. 沙漠，荒漠
desk|/desk/|n. 书桌，办公桌，写字台
detail|/ˈdiːteɪl/|n. 细节，细微之处
diploma|/dɪˈpləʊmə/|n. 毕业文凭，学位证书
directions|/dəˈrekʃ(ə)nz/|n. 方向
director|/dəˈrektə(r); daɪˈrektə(r)/|n. 导演
disability|/ˌdɪsəˈbɪləti/|n. 残疾，缺陷
discount|/ˈdɪskaʊnt/|n. 减价，折扣
discussion|/dɪˈskʌʃ(ə)n/|n. 讨论
dismiss|/dɪsˈmɪs/|v. 开除，解雇
display|/dɪˈspleɪ/|v. 展示，陈列
distribution|/ˌdɪstrɪˈbjuːʃn/|n. 分发
dolphins|/ˈdɒlfɪnz/|n. 海豚
donation|/dəʊˈneɪʃ(ə)n/|n. 捐赠物，捐赠，赠送
door|/dɔː(r)/|n. 门
double|/ˈdʌb(ə)l/|adj. 两倍的，双的
drawer|/drɔː(r)/|n. 抽屉
dressing|/ˈdresɪŋ/|n. 穿衣；装饰
driver|/ˈdraɪvə(r)/|n. 司机，驾驶员
driving|/ˈdraɪvɪŋ/|adj. 推动的，强有力的
drum|/drʌm/|n. 鼓
dust|/dʌst/|n. 沙尘
eagle|/ˈiːɡ(ə)l/|n. 鹰，雕
earth|/ɜːθ/|n. 地球，世界
eclipse|/ɪˈklɪps/|n. 日食，月食
economy|/ɪˈkɒnəmi/|n. 经济
ecosystem|/ˈiːkəʊsɪstəm/|n. 生态系统
education|/ˌedʒuˈkeɪʃ(ə)n/|n. 教育
efficiency|/ɪˈfɪʃ(ə)nsi/|n. 效率，效能
egg|/eɡ/|n. （鸟类的）卵，蛋
electronic|/ɪˌlekˈtrɒnɪk/|adj. 电子的，电子学的
emotion|/ɪˈməʊʃ(ə)n/|n. 情感，情绪
Emperor|/ˈempərə(r)/|n. 皇帝
end|/end/|n. 末尾，最后部分
engine|/ˈendʒɪn/|n. 发动机，引擎
engineers|/ˌendʒɪˈnɪəz/|n. 工程师
Europe|/ˈjʊərəp/|n. 欧洲
evaporation|/ɪˌvæpəˈreɪʃ(ə)n/|n. 蒸发
evolution|/ˌiːvəˈluːʃ(ə)n/|n. 进化
excellent|/ˈeksələnt/|adj. 极好的，卓越的
exhibitions|/ˌeksɪˈbɪʃənz/|n. 展览，展示会
expectation|/ˌekspekˈteɪʃ(ə)n/|n. 期待，预期
external|/ɪkˈstɜːn(ə)l/|adj. 外部的，外面的
extinct|/ɪkˈstɪŋkt/|adj. 灭绝的
extinction|/ɪkˈstɪŋkʃn/|n. 灭绝，消亡
fat|/fæt/|adj. 肥的，肥胖的
females|/ˈfiːmeɪl/|adj. 女性的，妇女的
fertilizer|/ˈfɜːtəlaɪzə(r)/|n. 肥料，化肥
fight|/faɪt/|v. 与……作斗争，坚决反对
filmed|/fɪlmd/|v. 拍摄
fireplaces|/ˈfaɪəpleɪsɪz/|n. 壁炉（fireplace 的复数）
flat|/flæt/|adj. 平的，水平的
flower|/ˈflaʊə(r)/|n. 花，开花植物
fluids|/ˈfluːɪdz/|n. 流体（fluid的复数）
fog|/fɒɡ/|n. 雾
font|/fɒnt/|n. 字体,字形
foundation|/faʊnˈdeɪʃ(ə)n/|n. 地基，基础
fox|/fɒks/|n. 狐狸
frequency|/ˈfriːkwənsi/|n. 频率
friendship|/ˈfrendʃɪp/|n. 友谊，朋友关系
frog|/frɒɡ/|n. 蛙，青蛙
fruit|/fruːt/|n. 水果
fur|/fɜː(r)/|n. 毛皮；皮
gallery|/ˈɡæləri/|n. 美术馆，画廊
game|/ɡeɪm/|n. 游戏，比赛
gas|/ɡæs/|n. 气体
glue|/ɡluː/|n. 胶水
Goods|/ɡʊdz/|n. 商品
government|/ˈɡʌvənmənt/|n. 政府，内阁
grammar|/ˈɡræmə(r)/|n. 语法，文法
grave|/ɡreɪv/|n. 坟墓，墓穴
green|/ɡriːn/|adj. 绿色的
guess|/ɡes/|v. 猜测，估计
guidelines|/ˈɡaɪdlaɪnz/|n. 准则，指导方针（guideline的复数）
guides|/ɡaɪdz/|n. 指南
half|/hɑːf/|n. 一半，二分之一
handle|/ˈhænd(ə)l/|v. 拿
hands|/hændz/|n. 手（hand 的复数）
hearing|/ˈhɪərɪŋ/|n. 听力，听觉
heated|/ˈhiːtɪd/|adj. 加热的，有供暖系统的
heater|/ˈhiːtə(r)/|n. 加热器
herb|/hɜːb/|n. 药草，香草
high|/haɪ/|adj. 高的
higher|/ˈhaɪə(r)/|adj. 更高的（high 的比较级）
hiking|/ˈhaɪkɪŋ/|n. 徒步旅行，远足
homework|/ˈhəʊmwɜːk/|n. 家庭作业
honey|/ˈhʌni/|n. 蜂蜜
hormones|/ˈhɔːməʊnz/|n. 激素
horse|/hɔːs/|n. 马
hostel|/ˈhɒst(ə)l/|n. 旅社，招待所
housing|/ˈhaʊzɪŋ/|n. 房屋，住宅
human|/ˈhjuːmən/|adj. 人的，人类的
humor|/ˈhjuːmə(r)/|n. 幽默，诙谐
hungry|/ˈhʌŋɡri/|adj. 感到饿的，饥饿的
ideas|/aɪˈdiə/|n. 想法（idea的复数）
identification|/aɪˌdentɪfɪˈkeɪʃ(ə)n/|n. 辨认，识别
images|/ˈɪmɪdʒɪz/|n. 形象；图像（image的复数）
immigration|/ˌɪmɪˈɡreɪʃ(ə)n/|n. 移民
impact|/ˈɪmpækt/|n. 撞击，冲击力
imported|/ɪmˈpɔː(r)tɪd/|adj. 输入的，进口的
income|/ˈɪnkʌm/|n. 收入，收益
industry|/ˈɪndəstri/|n. 工业，生产制造
infection|/ɪnˈfekʃ(ə)n/|n. 传染病
infrastructure|/ˈɪnfrəstrʌktʃə(r)/|n. 基础设施
inscriptions|/ɪnˈskrɪpʃnz /|n. 铭文（inscription 的复数）
intermediate|/ˌɪntəˈmiːdiət/|adj. 居中的，中间的
investors|/ɪnˈvestər/|n. 投资者（investor 的复数）
irrigate|/ˈɪrɪɡeɪt/|v. 灌溉
Italy|/ˈɪtəli/|n. 意大利
jeans|/dʒiːnz/|n. 牛仔裤
joke|/dʒəʊk/|n. 笑话，玩笑
Judo|/ˈdʒuːdəʊ/|n. （日）柔道
June|/dʒuːn/|n. 六月
keyboard|/ˈkiːbɔːd/|n. 键盘
kindness|/ˈkaɪndnəs/|n. 友好，仁慈，善良
knife|/naɪf/|n. 餐刀
knives|/naɪvz/|n. 刀子（knife的复数）
laboratories|/ˈlæbrətɔːriz/|n. 实验室（laboratory 的复数）
lanes|/leɪnz/|n. 线路，跑道（lane复数形式）
layers|/ˈleɪəz/|n. 层（layer的复数）
learn|/lɜːn/|v. 学习，学会
learners|/ˈlɜːnəz/|n. 学习者，初学者（learner的复数）
leaves|/liːvz/|n. 树叶；花瓣（leaf的复数）
lectures|/ˈlektʃəz/|n. 演讲，讲演（lecture 复数形式）
leg|/leɡ/|n. 腿
legal|/ˈliːɡ(ə)l/|adj. 法律允许的，合法的
lifestyle|/ˈlaɪfstaɪl/|n. 生活方式
lion|/ˈlaɪənz/|n. 狮子
listening|/ˈlɪsənɪŋ/|v. 听
lists|/ˈlɪsts/|n. 一览表, 目录, 名单（list的复数）
locker|/ˈlɒkə(r)/|n. 锁柜，寄物柜
machines|/məˈʃiːnz/|n. 机器（machine 的复数）
main|/meɪn/|adj. 主要的，最大的
mapping|/ˈmæpɪŋ/|v. 绘图；筹划（map的ing形式）
meals|/miːlz/|n. 膳食；谷类（meal的复数）
medication|/ˌmedɪˈkeɪʃn/|n. 药物，药品
memory|/ˈmeməri/|n. 记忆力，记性
menu|/ˈmenjuː/|n. 菜单
message|/ˈmesɪdʒ/|n. 消息；预言；启示
methodology|/ˌmeθəˈdɒlədʒi/|n. 方法论，一套方法
microphone|/ˈmaɪkrəfəʊn/|n. 扩音器，麦克风
microscope|/ˈmaɪkrəskəʊp/|n. 显微镜
mobility|/məʊˈbɪləti/|n. 迁移率；机动性
modern|/ˈmɒd(ə)n/|adj. 近代的，现代的
monthly|/ˈmʌnθli/|adj. 每月的，每月一次的
mood|/muːd/|n. 心境，情绪
morning|/ˈmɔːnɪŋ/|n. 早晨
motivation|/ˌməʊtɪˈveɪʃ(ə)n/|n. 动力，诱因
mouth|/maʊθ/|n. 嘴，口腔
natural|/ˈnætʃ(ə)rəl/|adj. 天然的，非人为的
neck|/nek/|n. 颈项，脖子
networking|/ˈnetwɜːkɪŋ/|n. 联网
normal|/ˈnɔːm(ə)l/|adj. 正常的，标准的
note|/nəʊt/|n. 短笺，便条
nutrition|/njuˈtrɪʃ(ə)n/|n. 营养，滋养
nylon|/ˈnaɪlɒn/|n. 尼龙
obligation|/ˌɒblɪˈɡeɪʃ(ə)n/|n. 义务，责任
occupancy|/ˈɒkjəpənsi/|n. 居住，占用
Opera|/ˈɒprə/|n. 歌剧演出，歌剧表演
opportunities|/ˌɒpəˈtjuːnətiz/|n. 因素；机会（opportunity 的复数）
oral|/ˈɔːrəl/|adj. 口头的，口述的
orientation|/ˌɔːriənˈteɪʃ(ə)n/|n. 目标，定位
origins|/ˈɒrɪdʒɪnz/|n. 起源（origin 的复数）
outdoor|/ˈaʊtdɔː(r)/|adj. 户外的，露天的
outline|/ˈaʊtlaɪn/|n. 轮廓，外形
overfill|/ˌəʊvəˈfɪl/|vt. 把……装得溢出
painting|/ˈpeɪntɪŋ/|n. 画，绘画作品
pairs|/peəz/|n. 一对，一双，一副
party|/ˈpɑːti/|n. 聚会，派对
pay|/peɪ/|v. 支付，付
peace|/piːs/|n. 和平，太平
performance|/pəˈfɔːməns/|n. 表演，演出
permission|/pəˈmɪʃ(ə)n/|n. 同意，许可
person|/ˈpɜːs(ə)n/|n. 人
pest|/pest/|n. 害虫，有害动物
petrol|/ˈpetrəl/|n. 汽油
picnic|/ˈpɪknɪk/|n. 野餐，野餐活动
pillow|/ˈpɪləʊ/|n. 枕头
pilots|/ˈpaɪləts/|n. 飞行员（pilot 的复数）
pizza|/ˈpiːtsə/|n. 比萨饼
plan|/plæn/|n. 计划；规划
planet|/ˈplænɪt/|n. 行星
planning|/ˈplænɪŋ/|n. 规划
plates|/pleɪts/|n. 盘子（plate 的复数）
pleasure|/ˈpleʒə(r)/|n. 快乐，满足，欣慰
poetry|/ˈpəʊətri/|n. 诗歌
police|/pəˈliːs/|n. 警察部门; 警方; 警察
polluted|/pəˈluːtɪd/|adj. 受污染的
population|/ˌpɒpjuˈleɪʃ(ə)n/|n. 人口，人口数量
portable|/ˈpɔːtəb(ə)l/|adj. 便携式的，轻便的
pots|/pɒts/|n. 锅（pot的复数）
powder|/ˈpaʊdə(r)/|n. 粉，粉末
prejudice|/ˈpredʒədɪs/|n. 偏见，成见，歧视
preparation|/ˌprepəˈreɪʃ(ə)n/|n. 准备（指动作或过程）
prepared|/prɪˈpeəd/|adj. 有准备的，准备好的
presentation|/ˌprez(ə)nˈteɪʃ(ə)n/|n. 简述报告；赠送(仪式)
preserved|/prɪˈzɜːvd/|adj. 保藏的
pressure|/ˈpreʃə(r)/|n. 压力，挤压
prevalent|/ˈprevələnt/|adj. 盛行的，普遍的
prices|/praisiz/|n. 价格（price 的复数）
prison|/ˈprɪz(ə)n/|n. 监狱，牢房
procedure|/prəˈsiːdʒə(r)/|n. 手续，步骤
process|/ˈprəʊses/|n. 步骤，程序
professor|/prəˈfesə(r)/|n. 教授
profit|/ˈprɒfɪt/|n. 利润，盈利
promotion|/prəˈməʊʃ(ə)n/|n. 提拔，晋升
proof|/pruːf/|n. 证明，证据
protected|/prəˈtektɪd/|adj. 受保护的
protection|/prəˈtekʃ(ə)n/|n. 保护，防护
protein|/ˈprəʊtiːn/|n. 蛋白质
public|/ˈpʌblɪk/|adj. 公众的，大众的
pump|/pʌmp/|n. 泵，抽水机
purpose|/ˈpɜːpəs/|n. 目的，意图
quantity|/ˈkwɒntəti/|n. 量，数目
quiet|/ˈkwaɪət/|adj. 轻声的，安静的
rabbit|/ˈræbɪt/|n. 兔
race|/reɪs/|n. 赛跑，速度竞赛
rack|/ræk/|n. 架子，支架
radar|/ˈreɪdɑː(r)/|n. 雷达，无线电探测系统
rainfall|/ˈreɪnfɔːl/|n. 降雨
rainwater|/ˈreɪnwɔːtə(r)/|n. 雨水
random|/ˈrændəm/|adj. 随机的，任意的
reactions|/riˈækʃənz/|n. 反应（reaction 的复数）
recording|/rɪˈkɔːdɪŋ/|n. 录音，录像
reduction|/rɪˈdʌkʃ(ə)n/|n. 减小，降低
related|/rɪˈleɪtɪd/|adj. 相关的，有联系的
reliable|/rɪˈlaɪəb(ə)l/|adj. 可靠的，可信赖的
religion|/rɪˈlɪdʒən/|n. 宗教信仰
respect|/rɪˈspekt/|n. 尊敬，敬重
risks|/rɪsks/|n. 风险，危险（risk 复数）
rivals|/ˈraɪvlz/|n. 对手（rival 的复数）
rubber|/ˈrʌbə(r)/|n. 橡胶，合成橡胶
rubbish|/ˈrʌbɪʃ/|n. 垃圾，废弃物
rush|/rʌʃ/ |v. 冲，奔
salary|/ˈsæləri/|n. 薪金，薪水
sample|/ˈsɑːmp(ə)l/|n. 样本，样品
sandwiches|/ˈsænwɪtʃz/|n. 三明治（sandwich的复数）
scores|/skɔːz/|n. 考试成绩；比分（score的复数）
script|/skrɪpt/|n. 剧本，讲稿
sculptures|/ˈskʌlptʃəz/|n. 雕塑（sculpture 的复数）
sea|/siː/|n. 海洋
self-centered|/self ˈsentəd/|adj. 自我中心的
sensitive|/ˈsensətɪv/|adj. 敏感的，易受影响的
servant|/ˈsɜːvənt/|n. 仆人，佣人
settle|/ˈset(ə)l/|vi. 定居；下陷；解决
share|/ʃeə(r)/|v. 共享，合用
sheep|/ʃiːp/|n. 羊，绵羊
sheet|/ʃiːt/|n. 床单，被单
shellfish|/ˈʃelfɪʃ/|n. 贝类动物,甲壳类动物
signal|/ˈsɪɡnəl/|n. 信号，暗号
signature|/ˈsɪɡnətʃə(r)/|n. 签名，署名
significance|/sɪɡˈnɪfɪkəns/|n. 重要性，意义
slide|/slaɪd/|v. （使）滑行，滑动
slow|/sləʊ/|adj. 低速的，缓慢的
small|/smɔːl/|adj. 小型的
smoke|/sməʊk/|n. 烟，烟雾
smooth|/smuːð/|adj. （表面）光滑的，平坦的
society|/səˈsaɪəti/|n. 社会
soup|/suːp/|n. 汤，羹
south|/saʊθ/|n. 南，南方
stars|/stɑ:z/|n. 星星，明星（star 的复数形式）
starvation|/stɑːˈveɪʃ(ə)n/|n. 饥饿，捱饿
still|/stɪl/|adv. 还，依旧
stimulation|/ˌstɪmjuˈleɪʃ(ə)n/|n. 刺激，激励，兴奋作用
stomach|/ˈstʌmək/|n. 胃
stored|/stɔ:(r)d/|v. 储存
stressful|/ˈstresf(ə)l/|adj. 紧张的，压力大的
strict|/strɪkt/|adj. 要求严格的，严厉的
structure|/ˈstrʌktʃə(r)/|n. 结构，构造
surfing|/ˈsɜːfɪŋ/|n. 冲浪运动
survey|/ˈsɜːveɪ/|n. 民意调查，民意测验
swim|/swɪm/|v. 游泳
table|/ˈteɪb(ə)l/|n. 桌子，台子
tank|/tæŋk/|n. 箱，罐，缸
teenagers|/ˈtiːneɪdʒəz/|n. 青少年（teenager 的复数）
television|/ˈtelɪvɪʒ(ə)n/|n. 电视，电视机
textile|/ˈtekstaɪl/|n. 纺织物，织物
theater|/ˈθɪətə(r)/|n. 电影院，戏院，剧场
thunderstorm|/ˈθʌndəstɔːm/|n. 雷雨，雷暴，雷雨交加
timber|/ˈtɪmbə(r)/|n. 木材，原木
total|/ˈtəʊt(ə)l/|adj. 总的，全部的
tour|/tʊə(r)/|n. 旅行，旅游
tourism|/ˈtʊərɪzəm/|n. 旅游业，观光业
trace|/treɪs/|v. 查出，发现，追踪
trail|/treɪl/|n. 痕迹，踪迹
train|/treɪn/|n. 火车，列车
transportation|/ˌtrænspɔːˈteɪʃ(ə)n/|n. 运输，运送
travelling|/ˈtrævəlɪŋ/|adj. 旅行的；巡回的，巡演的
treatment|/ˈtriːtmənt/|n. 对待，待遇
trends|/trendz/|n. 动态，趋势（trend的复数）
tunnel|/ˈtʌn(ə)l/|n. 隧道，地道
TV|/ˌtiːˈviː/|abbr. 电视（television）
twin|/twɪn/|n. 双胞胎之一，孪生儿之一
typing|/ˈtaɪpɪŋ/|v. 打字；按类型把…归类（type的现在分词）
umbrella|/ʌmˈbrelə/|n. 伞，雨伞，阳伞
unanswered|/ ʌnˈɑːnsəd /|adj. 未答复的
underground|/ˌʌndəˈɡraʊnd/|adv. 在地（面）下
unfurnished|/ʌnˈfɜːnɪʃt/|adj. 无装备的
unnatural|/ʌnˈnætʃrəl/|adj. 不自然的
urban|/ˈɜːbən/|adj. 城市的，城镇的
vitamins|/ˈvɪtəmɪnz/|n. 维生素（vitamin的复数）
vocabulary|/vəˈkæbjələri/|n. 词汇
wages|/ˈweɪdʒɪz/|n. 工资；报酬（wage的复数形式）
watering|/ˈwɔːtərɪŋ/|n. 洒水，浇水；(指动物)饮水
wave|/weɪv/|v. 挥手
Wednesday|/ˈwenzdeɪ/|n. 星期三
wheelchair|/ˈwiːltʃeə(r)/|n. 轮椅
workplace|/ˈwɜːkpleɪs/|n. （办公室，工厂）等工作场所
workshops|/ˈwɜːkʃɒps/|n. 工场；研讨会（workshop的复数）
write|/raɪt/|v. 写作，编写
writing|/ˈraɪtɪŋ/|n. 笔迹、作品；v. 书写（write的ing形式）
young|/jʌŋ/|adj. 幼小的，年轻的
zoos|/zuːz/|n. 动物园（zoo 的复数形式）
danger|/ˈdeɪndʒə(r)/|n. 危险，风险
area|/ˈeəriə/|n. 地区，区域
hall|/hɔːl/|n. 礼堂，大厅
center|/ˈsentə(r)/|n. 中间，中心
railway|/ˈreɪlweɪ/|n. 铁路，铁道
video|/ˈvɪdiəʊ/|n. 录像
boat|/bəʊt/|n. 小船
project|/ˈprɒdʒekt; prəˈdʒekt/|n. 项目，计划
room|/ruːm/|n. 房间，室
black|/blæk/|adj. 黑的，黑色的
soccer|/ˈsɒkə(r)/|n. 英式足球，足球
season|/ˈsiːz(ə)n/|n. 季节
welfare|/ˈwelfeə(r)/|n. 幸福，安康
crime|/kraɪm/|n. 罪，罪行
lighting|/ˈlaɪtɪŋ/|n. 照明
telephone|/ˈtelɪfəʊn/|n. 电话
voice|/vɔɪs/|n. 嗓音，说话声
building|/ˈbɪldɪŋ/|n. 建筑物，房屋
fish|/fɪʃ/|n. 鱼
break|/breɪk/|v. 打破，折断
lift|/lɪft/|v. 提起，举起
blue|/bluː/|adj. 蓝色的
snake|/sneɪk/|n. 蛇
dog|/dɒɡ/|n. 狗，犬
port|/pɔːt/|n. 港口，避风港
damage|/ˈdæmɪdʒ/|n. 损坏，损失
combination|/ˌkɒmbɪˈneɪʃ(ə)n/|n. 合作, 结合
health|/helθ/|n. 身体状况
journalist|/ˈdʒɜːnəlɪst/|n. 记者
friend|/frend/|n. 朋友，友人
team|/tiːm/|n. 队，小组
headache|/ˈhedeɪk/|n. 头痛
flood|/flʌd/|v. （使）淹没
clean|/kliːn/|adj. 洁净的，干净的
North|/nɔːθ/|n. 北，北方
actor|/ˈæktə(r)/|n. 演员
temple|/ˈtemp(ə)l/|n. 庙宇，寺院
laptop|/ˈlæptɒp/|n. 便携式电脑
parking|/ˈpɑːkɪŋ/|n. 停车，泊车
budget|/ˈbʌdʒɪt/|n. 预算
Scotland|/ˈskɒtlənd/|n. 苏格兰
weapon|/ˈwepən/|n. 武器，兵器，凶器
home|/həʊm/|n. 家，住宅
simple|/ˈsɪmp(ə)l/|adj. 简单的，简明的
battery|/ˈbætri/|n. 电池，蓄电池
white|/waɪt/|adj. 白色的
babies||n. 婴儿（baby 的复数）
storage|/ˈstɔːrɪdʒ/|n. 储存，贮藏
sunlight|/ˈsʌnlaɪt/|n. 阳光，日光
magazine|/ˌmæɡəˈziːn/|n. 杂志，期刊
clothes|/kləʊðz/|n. 衣服，衣物
photography|/fəˈtɒɡrəfi/|n. 摄影，摄影术
street|/striːt/|n. 街道
guest|/ɡest/|n. 客人
number|/ˈnʌmbə(r)/|n. 数字
Road|/rəʊd/|n. 路，公路，马路，街
student|/ˈstjuːd(ə)nt/|n. 学生
hot|/hɒt/|adj. 热的，高温的
window|/ˈwɪndəʊ/|n. 窗，窗玻璃
book|/bʊk/|n. 书，书籍
bottle|/ˈbɒt(ə)l/|n. 瓶子
confidence|/ˈkɒnfɪdəns/|n. 自信，信心
net|/net/|n. 网，网状物
ticket|/ˈtɪkɪt/|n. 票，入场券
rate|/reɪt/|n. 速度，速率
line|/laɪn/|n. 线，线条
wooden|/ˈwʊdn/|adj. 木制的
next|/nekst/|adj. 下一个的，接下来的
Living|/ˈlɪvɪŋ/|adj. 活着的，活的
early|/ˈɜːli/|adj. 早期的，初期的
free|/friː/|adj. 免费的
national|/ˈnæʃ(ə)nəl/|adj. 国家的，全国的
board|/bɔːd/|n. 板，木板
bar|/bɑː(r)/|n. 酒吧
department|/dɪˈpɑːtmənt/|n. （组织或机构中的）部，司，系，处，科
teaching|/ˈtiːtʃɪŋ/|n. 教学工作，授课
record|/ˈrekɔːd/|n. 记录，记载
coin|/kɔɪn/|n. 硬币，金属货币
bone|/bəʊn/|n. 骨，骨头
seminar|/ˈsemɪnɑː(r)/|n. 研讨会，培训会
program|/ˈprəʊɡræm/|n. 程序；计划；大纲
wolf|/wʊlf/|n. 狼
sell|/sel/|v. 出让，转让
first|/fɜːst/|det. 第一位的，最先的
walk|/wɔːk/|v. 走，步行
paint|/peɪnt/|n. 油漆，涂料
tutorials||n. 教程（tutorial的复数）
pack|/pæk/|v. （把……）打包，收拾（行李）
May|/meɪ/|n. 五月
bucket|/ˈbʌkɪt/|n. 桶
focus|/ˈfəʊkəs/|n. 重点，中心点
method|/ˈmeθəd/|n. 方法，办法
noisy|/ˈnɔɪzi/|adj. 聒噪的
standard|/ˈstændəd/|n. 标准，水平
limitation|/ˌlɪmɪˈteɪʃ(ə)n/|n. 限制，制约
exercise|/ˈeksəsaɪz/|n. 运动，锻炼
knee|/niː/|n. 膝盖，膝关节
stick|/stɪk/|n. 手杖，拐杖；木条；v. 粘住
`;
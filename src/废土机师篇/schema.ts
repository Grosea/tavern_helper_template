export const Schema = z.object({
  系统: z.object({
    日期: z.string().default('复苏100年/01/01'),
    时间: z.string().default('06:00'),
    当前位置: z.string().default('起始荒原'),
    当前阶段: z.enum(['探索', '战斗', '经营', '交涉', '修复']).default('探索'),
    移动状态: z.enum(['驻留', '航程中', '全速航行']).default('驻留'),
    灾害预警: z.enum(['无', '孢子潮汐', '地壳碎裂', '酸雨前锋', '沙暴', '暴风雪']).default('无'),
    当前天气: z.enum(['晴', '阴', '酸雨', '孢子雾', '铁锈风', '电磁风暴', '辐射尘', '地热蒸汽', '冰雾', '静滞低压']).default('阴'),
    季节: z.enum(['旱季', '雨季', '寒季', '风季']).default('旱季'),
    危机等级: z.coerce.number().transform(v => _.clamp(v, 0, 4)).default(0),
    危机计数器: z.coerce.number().transform(v => _.clamp(v, 0, 8)).default(0),
    当前温度: z.coerce.number().transform(v => _.clamp(v, -60, 80)).default(14),
    舱内温度: z.coerce.number().transform(v => _.clamp(v, 0, 45)).default(22),
    已行驶里程: z.coerce.number().transform(v => _.clamp(v, 0, 999999)).default(0),
    已发现区域: z.array(z.string()).default([]),
    近期事务: z.array(z.string()).default([]),
    已解锁成就: z.array(z.string()).default([]),
    任务列表: z.record(z.string(), z.object({
      类型: z.enum(['主线', '支线']).default('支线'),
      目标: z.string().default(''),
      奖励: z.string().default(''),
      状态: z.enum(['进行中', '已完成', '失败']).default('进行中'),
      期限: z.string().default('无'),
    }).default({})).default({}),
  }).default({}),

  当前战斗: z.object({
    距离: z.enum(['接触', '近距', '中距', '远距', '超远距']).default('中距'),
    敌方类型: z.enum(['机械', '变异兽', '植物真菌', '能量体', '人类', '混合']).default('机械'),
    敌方规模: z.string().default(''),
    敌方状态: z.string().default(''),
    遭遇预警: z.enum(['无预警', '短预警', '标准预警']).default('标准预警'),
  }).default({}),

  基地: z.object({
    燃料: z.coerce.number().transform(v => _.clamp(v, 0, 5000)).default(80),
    基地装甲: z.coerce.number().transform(v => _.clamp(v, 0, 5000)).default(50),
    零件: z.coerce.number().transform(v => _.clamp(v, 0, 5000)).default(50),
    物资: z.coerce.number().transform(v => _.clamp(v, 0, 5000)).default(80),
    底盘等级: z.enum(['T1机动避难所', 'T2小型基地', 'T3中型基地', 'T4大型基地', 'T5终极堡垒']).default('T1机动避难所'),
    总空间: z.coerce.number().default(20),
    已用空间: z.coerce.number().default(20),
    外观: z.string().default(''),
    内饰: z.string().default(''),
    引擎: z.array(z.object({
      名称: z.string(),
      等级: z.string(),
    }).default({})).default([]),
    模块: z.record(z.string(), z.object({
      类别: z.string(),
      等级: z.string(),
      空间: z.coerce.number(),
      状态: z.string().default('正常'),
      来源: z.string().default('初始'),
    }).default({})).default({}),
    物品栏: z.record(z.string(), z.object({
      品级: z.string().default('T1'),
      数量: z.coerce.number().default(0),
      单件重量: z.coerce.number().default(0),
      来源: z.string().default(''),
      描述: z.string().default(''),
    }).default({})).default({}),
    已用负重: z.coerce.number().default(0),
  }).default({}),

  多恩: z.object({
    武力: z.coerce.number().transform(v => _.clamp(v, 1, 10)).default(6),
    工程: z.coerce.number().transform(v => _.clamp(v, 1, 10)).default(6),
    感知: z.coerce.number().transform(v => _.clamp(v, 1, 10)).default(6),
    统御: z.coerce.number().transform(v => _.clamp(v, 1, 10)).default(6),
    天赋: z.array(z.string()).default([]),
    装备: z.object({
      主武器: z.string().default('无'),
      副武器: z.string().default('无'),
      护甲: z.string().default('无'),
      工具槽: z.string().default('无'),
    }).default({}),
    背包: z.record(z.string(), z.object({
      品级: z.string().default('T1'),
      数量: z.coerce.number().default(0),
      单件重量: z.coerce.number().default(0),
      来源: z.string().default(''),
      描述: z.string().default(''),
    }).default({})).default({}),
    已用负重: z.coerce.number().default(0),
  }).default({}),

  机甲: z.object({
    名称: z.string().default('MC-00 荒狼'),
    核心: z.object({
      材料: z.enum(['废铁', '军标', '合金', '遗产']).default('军标'),
      体积: z.coerce.number().default(18),
      自重: z.coerce.number().default(6),
      电力: z.coerce.number().default(20),
      描述: z.string().default(''),
    }).default({}),
    右臂: z.object({
      材料: z.enum(['废铁', '军标', '合金', '遗产']).default('军标'),
      体积: z.coerce.number().default(4),
      自重: z.coerce.number().default(4),
      可挂武器: z.string().default('轻型+中型'),
      描述: z.string().default(''),
    }).default({}),
    左臂: z.object({
      材料: z.enum(['废铁', '军标', '合金', '遗产']).default('废铁'),
      体积: z.coerce.number().default(3),
      自重: z.coerce.number().default(3),
      可挂武器: z.string().default('仅轻型'),
      描述: z.string().default(''),
    }).default({}),
    腿部: z.object({
      材料: z.enum(['废铁', '军标', '合金', '遗产']).default('军标'),
      形态: z.enum(['二足', '逆关节', '四足', '履带']).default('二足'),
      体积: z.coerce.number().default(5),
      自重: z.coerce.number().default(6),
      载重: z.coerce.number().default(25),
      描述: z.string().default(''),
    }).default({}),
    头部: z.object({
      材料: z.enum(['废铁', '军标', '合金', '遗产']).default('废铁'),
      体积: z.coerce.number().default(1),
      自重: z.coerce.number().default(1),
      电力消耗: z.coerce.number().default(1),
      描述: z.string().default(''),
    }).default({}),
    武器配置: z.array(z.object({
      硬点: z.string(),
      武器: z.string(),
      弹种: z.string(),
      备弹: z.coerce.number().transform(v => _.clamp(v, 0, 999)).default(0),
    }).default({})).default([]),
    外观: z.string().default(''),
    同乘机娘: z.string().default(''),
    击毁数: z.coerce.number().transform(v => _.clamp(v, 0, 9999)).default(0),
  }).default({}),

  载具: z.record(z.string(), z.object({
    底盘: z.string().default('无'),
    引擎: z.string().default('无'),
    武器: z.array(z.string()).default([]),
    耐久: z.coerce.number().transform(v => _.clamp(v, 0, 100)).default(100),
    状态: z.string().default('待命'),
    货物: z.record(z.string(), z.object({
      品级: z.string().default('T1'),
      数量: z.coerce.number().default(0),
      单件重量: z.coerce.number().default(0),
      来源: z.string().default(''),
      描述: z.string().default(''),
    }).default({})).default({}),
    已用负重: z.coerce.number().default(0),
  }).default({})).default({}),

  机娘关系网: z.record(z.string(), z.coerce.number().transform(v => _.clamp(v, -50, 50))).default({}),

  势力态度: z.record(z.string(), z.coerce.number().transform(v => _.clamp(v, -100, 100))).default({}),
  势力事件日志: z.array(z.string()).default([]),

  NPC名录: z.record(z.string(), z.object({
    身份: z.string().default(''),
    所属势力: z.string().default(''),
    当前位置: z.string().default(''),
    状态: z.string().default('活跃'),
    备注: z.string().default(''),
  }).default({})).default({}),

  机娘名册: z.record(z.string(), z.object({
    类型: z.enum(['战斗型', '工程型', '侦察型', '支援型', '重火型']).default('战斗型'),
    副标签: z.object({
      气质: z.string().default(''),
      社交: z.string().default(''),
      情感表达: z.string().default(''),
      价值观: z.string().default(''),
    }).default({}),
    背景: z.string().default(''),
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).default(0),
    好感阶段: z.enum(['初识', '熟悉', '暧昧', '恋人', '深爱']).default('初识'),
    // NSFW追踪 — 防止事件重复，校准亲密自然度
    已触发亲密事件: z.array(z.string()).default([]),
    亲密次数: z.coerce.number().transform(v => _.clamp(v, 0, 999)).default(0),
    上次亲密: z.string().default(''),  // 日期时间字符串
    // 身体与XP — 激活时写入，后续可随好感解锁新XP
    身形描述: z.string().default(''),  // 激活时从用户描述生成(e.g. '纤细但肌肉线条紧致，胸部匀称，腰窄臀圆')
    XP: z.array(z.string()).default([]),  // 性偏好，激活时由副标签+背景推测1-2个，好感提高可追加
    天赋: z.array(z.string()).default([]),
    装甲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)).default(100),
    零件耐久: z.coerce.number().transform(v => _.clamp(v, 0, 100)).default(100),
    状态: z.string().default('待命'),
    位置: z.string().default('基地内'),
    出战: z.boolean().default(false),
    装备: z.object({
      主武器: z.string().default('无'),
      副武器: z.string().default('无'),
      护甲: z.string().default('无'),
      工具槽: z.string().default('无'),
    }).default({}),
    // [DEPRECATED] 僚机系统已随 has_wingman 变量删除而废弃，此字段仅保留向后兼容，不再使用
    僚机: z.object({
      名称: z.string().default(''),
      骨架: z.string().default(''),
      引擎: z.string().default(''),
      底盘: z.string().default(''),
      装甲方案: z.string().default(''),
      武器配置: z.array(z.object({
        硬点: z.string(),
        武器: z.string(),
        弹种: z.string(),
        备弹: z.coerce.number().transform(v => _.clamp(v, 0, 999)).default(0),
      }).default({})).default([]),
      击毁数: z.coerce.number().transform(v => _.clamp(v, 0, 9999)).default(0),
    }).default({}),
  }).default({})).default({}),
}).default({});

export type Schema = z.output<typeof Schema>;

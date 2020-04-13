## 概述
[My Github Link](https://github.com/kehuo/algorithm_py3)

### 动态规划概念
动态规划通常用来解决最优化问题. 在这类问题中, 我们通过做出一组选择来达到最优解. 
在做出每个选择的同时, 通常会生成和原问题形式相同的子问题. 当多于一个选择子集都
生成相同的子问题时, 动态规划就很有效.

动态规划的关键技术就是对每个这样的子问题都保存其解, 当其重复出现时, 可以避免重复
求解此问题.

动态规划的思路, 可以将指数时间的算法转换成多项式时间的算法.
 
### 与分治法的比较

1. 相同点

> 动态规划和分治法类似, 都是通过 "组合子问题的解" 来求解原问题.

2. 不同点

> <1> 分治法将问题转化为 **互不相交** 的子问题, 递归地求解每个子问题, 再将它们的解
组合起来.

> <2> 动态规划中, 也有子问题, 但是和分治法不同的是, 动态规划中的子问题可能会 **重复** 的,
也就是说, 当不同的子问题具有公共的子子问题 (子问题的求解是递归进行的, 将其分解为更小
的子子问题)

> 所以, 如果让分治法去求解 "有重复子子问题" 的问题, 它就会反复的求解同样的公共子问题.
而动态规划对每个子子问题只求解一次, 并将其保存在一个表格中, 从而保证无需每次需要子子问题
的解时, 都从头去重复计算, 避免了这种重复工作.

### 动态规划的一般步骤

动态规划通常用来求解最优化问题 (optimization problem). 这类问题可以有很多可行的
解, 每个解都有一个值, 而我们希望寻找的是具有最优值 (比如最小值或最大值) 的解. 我们
称这样的解, 是问题的其中一个最优解 (an optimal solution), 而不是唯一的一个最优
解 (the optimal solution), 因为可能有多个解都达到最有值.

通常, 我们按照以下4个步骤来设计一个动态规划算法

1. 刻画一个最优解的结构特征
2. 递归地定义最优解的值
3. 计算最优解的值 (通常采用自底向上的方法, 具体会在后面章节详细介绍)
4. 利用计算出的信息构造一个最优解

其中, 步骤1-3是动态规划解的基础. 如果我们仅需要一个最优解的值, 而非解本身, 那么
步骤1-3足矣. 如果确实需要步骤4, 有时就需要在构造步骤3的过程中, 维护一些额外信息, 以
便用来构造一个最优解.

### 本节的问题实践 -- 钢条切割 (Building...)
# 5.1 雇佣问题
[My Github Link](https://github.com/kehuo/algorithm_py3)

## 引入问题

假如你要雇佣一名新的办公助理。你先前的雇佣尝试都失败了，于是你决定找一个雇佣代理。雇佣代理每天
给你推荐一个应聘者，你会面试这个应聘者，然后决定是否录用他。你必须付给雇佣代理一小笔费用，以便
面试应聘者。然而，如果真的要雇佣一个应聘者，你需要花更多的钱，因为你必须辞掉当前的办公助理，还
药付一大笔中介费给雇佣代理。你承诺在任何时候，都要找最合适的人来担任这项职务。因此，你决定在面
试完每一个应聘者后，如果该应聘者被当前的办公助理更合适，就会辞掉当前的办公助理，然后聘用新的。
愿意为该策略付费，但希望能够估算该费用是多少。

下面给出的 HIRE-ASSISTANT 伪代码，表示出这个雇佣策略。假设应聘办公助理的候选人编号从 1 到 n。
该过程中，假设你能在面试完应聘者 i 以后，决定 i 是否是你目前见过的最佳人选。初始化时，该过程
会创建一个虚拟应聘者，编号为 0 ，而且他比所有的应聘者都差。

    HIRE-ASSISTANT(n)
    1 best = 0  // candidate 0 is a least-qualified dummy candidate
    2 for i = 1 to n
    3     interview candidate i
    4     if candidate i is better than candidate best
    5         best = i
    6         hire candidate i

注意，这个问题的费用模型和第二章的模型不同。我们关注的不再是 “执行时间”， 而是 “面试和雇佣” 所
产生的费用。

其他building.....


## 最坏情况分析

building....


## 概率分析

building...


## 随机算法

building...
# 8.4 桶排序 
[My Github Link](https://github.com/kehuo/algorithm_py3)

## 引言

桶排序假设输入数据服从均匀分布, 平均情况下它的时间代价是 O(n)。与计数排序类似，因为对输入数据做了
某种假设，桶排序的速度也很快。具体来说，计数排序假设输入数据都属于一个小区间内的整数，而桶排序则
假设输入数据是由一个随机过程产生的，该过程将元素均匀、独立地分布在 \[0, 1] 区间上。

更多简介的文字部分正在 building...


## 伪代码实现
    BUCKET-SORT(A)
    1 n = A.length
    2 let B = [0...n-1] be a new array
    3 for i = 0 to n-1
    4     make B[i] an empty list
    5 for i = 1 to n
    6     insert A[i] into list B[<nA[i]>]
    7 for i = n-1
    8     sort list B[i] with insertion sort
    9 concatenate the list B[0],B[1],...,B[n-1] together in order

注意，在上面伪代码第 6 行，的 B\[<A\[i]>] 中包含一对 尖括号, 这个尖括号在算法导论原著中，是用另一
个符号表示的，因为我不知道如何打出该符号，并且不知道该符号的含义，所以暂时用尖括号代替。之后了解
清楚后会将这个符号的含义，以及如何在电脑上打出这个符号，更新到这篇文档中。

这个符号出现在原著第 202 页。

## python3 实现

building...
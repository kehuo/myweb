# 第2章 算法基础 - 2.1 插入排序
[My Github Link](https://github.com/kehuo/algorithm_py3)


### 引入问题

这是本书的第一个算法, 我们引入这个排序问题:

输入: n 个数的一个序列 <a1, a2, a3, ..., an>

输出: 排序好的一个排列 <a1', a2', a3', ..., an'>。其中a1' <= a2' <= a3' <= ... <= an'

我们希望排序的数也叫作 ***关键词***。 虽然概念上我们在排序一个序列，但是输入是以 n 个元素的
数组形式出现的。


### 伪代码实现

    INSERTION-SORT(A)
    1 for j = 2 in A.length
    2     key = A[j]
    3     // Insert A[j] into the sorted sequence A[1, 2, ..., j-1]
    4     i = j - 1
    5     while i > 0 and A[i] > key
    6         A[i+1] = A[i]
    7         i = i - 1
    8     A[i+1] = key
    

### Python3 实现

Building...



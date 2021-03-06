# 6.1 堆
[My Github Link](https://github.com/kehuo/algorithm_py3)

## 引入本章概念
### 和 "插入排序" / "归并排序" 的异同
堆排序 (heapsort) 和归并排序一样, 但是不同于插入排序的是, 堆排序的时间复杂度是 nlg(n).

和插入排序相同, 但是和归并排序不同的是, 堆排序具有 "空间原址性", 即, 任何时候, 都只需要
常数个额外的元素空间用来存储临时数据.

因此, 堆排序集合了 归并排序 和 插入排序的优点.


### 引入新的数据结构
堆排序引入了另一种算法设计技巧, 使用一种叫做 "堆" 的数据结构来进行信息管理. 堆不仅用在堆排
序中, 而且可以构造一种有效的 "优先队列".


## 6.1 堆
如下图 (building), (二叉)堆是一个数组, 它可以被看成一个近似的完全二叉树(见第五章第3节
). 树上的每一个节点对应数组的一个元素. 除了最底层以外, 该树是完全充满的. 而且是从左向右
填充. 表示堆的数组 A 有2个属性:
> A.length(通常) 给出数组元素的个数
> A.heap-size 有多少个堆元素存储在该数组中.

也就是说, 虽然 A[1, ..., A.length] 可能都存有数据, 但是, 只有 A[1, ..., A.heap-size]
中存放的是堆的有效元素. (这里 0 <= A.heap-size <= A.length)

树的根结点是 A[1] (Python中是 A[0]), 如果给定这样一个下标 i, 我们很容易计算到它的父节
点 / 左孩子节点 和 右孩子节点 的数组下标:
> PARENT(i) = [i / 2]
> LEFT(i) = 2 * i
> RIGHT(i) = (2 * i) + 1


[插图1]: https://kevinhuo.cool/imgs/welcome/do_not_stop.jpg
![插图1] 


二叉堆可以分为2种形式, 最大堆 和 最小堆.
> 最大堆性质: 除了根结点以外, 所有其他节点都满足:
> A[PARENT(i)] >= A[i] <br/>
> 也就是说, 某个节点的值, 不得大于其父节点的值. 因此, 堆中最大元素存放在根结点中. 并且,
> 在任意一颗子树中, 该子树包含的所有节点的值, 都应该小于或等于该子树根结点的值.

> 最小堆性质: 正好相反, 除了根结点以外, 所有其他节点满足:
> A[PARENT(i)] <= A[i] <br/>
> 所以堆中的最小值存放在根结点中. 

## 2 堆的一些基本过程和操作 (后面章节详细介绍)
MAX-HEAPIFY: 维护最大堆性质的关键 (负载度 lg(n))
BUILD-MAX-HEAP: 从无序的输入数据数组中构造一个最大堆. (线性复杂度)
HEAPSORT: 对一个数组进行原址排序 (线性复杂度)
MAX-HEAP-INSERT / HEAP-EXTRACT-MAX / HEAP-INCREASE-KEY / HEAP-MAXIMUM: 利用堆
实现一个优先队列的所需过程, 复杂度都是 lg(n)


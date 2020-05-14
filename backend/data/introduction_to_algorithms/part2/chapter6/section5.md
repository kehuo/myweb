# 6.5优先队列
[My Github Link](https://github.com/kehuo/algorithm_py3)

堆排序是一个优秀的算法，但是在实际应用中，后面章节中将要讲到的 "快速排序"，排序性能一般要优于堆
排序。尽管如此， "堆" 这个数据结构仍然有很多应用。 在本节介绍的是堆的一个常见应用：
> 作为高效的有效队列

和堆一样，优先队列也有2种形式，***最大优先队列*** 和 ***最小优先队列***。本节只介绍最大优先队列。

## 优先队列定义
优先队列 (priority queue) 是一种用来维护由一组元素的集合 S 的数据结构，其中的每一个元素都有一个
相关的值，称为 "关键字(key)"。

一个最大优先队列支持以下操作:
> INSERT(S, x): 把元素 x 插入集合 S 中。这个操作等价于 S = S U {x}

> MAXIMUM(S): 返回 S 中具有最大关键字的元素。

> EXTRACT-MAX(S): 去掉并返回 S 中的具有最大关键字的元素。

> INCREASE-KEY(A, x, k): 将元素 x 的关键字的值增加到 k. 这里假设 k > x的关键字值


### 伪代码

    HEAP-MMAXIMUM(A)
    1 retunn A[1]
    
    HEAP-EXTRACT-MAX(A)
    1 if A.heap-size < 1
    2     error "heap underflow"
    3 max = A[1]
    4 A[1] = A[A.heap-size]
    5 A.heap-size  = A.heapsize - 1
    6 MAX-HEAPIFY(A, 1)
    7 return max
    
    HEAP-INCREASE-KEY(A, i, key)
    1 if key < A[i]
    2 error "new key is smaller than current key"
    3 A[i] > key
    4 while i >1 and A[PARENT(i)] < A[i]
    5     exchange A[i] with A[PARENT(parent)]
    5     i = PARENT(i)
    
[截图1]: https://kevinhuo.cool/imgs/introduction_to_algorithms/part2/chapter6/section5/1.jpg


上面的截图 (图片在building...) 展示的 HEAP-INCREASE-KEY 的操作过程 (文中所说的关键字, 就是图中圆圈里的值, 比如15).

下面的伪代码能够实现 INSERT 操作。他的输入是要被插入到最大堆 A 中的新元素的关键字。 
MAX-HEAP-INSERT 首先通过增加一个关键字，为 负无穷 的叶子结点来扩展最大堆。然后调用
HEAP-INCREASE-KEY 为新节点设置对应的关键字，同时保持最大堆的性质.

    MAX-HEAP-INSERT(A, key)
    1 heap-size = A.heap-size + 1
    2 A[A.heap-size] = 负无穷
    3 HEAP-INCREASE-KEY(A, A.heap-size, key)

在包含 n 个元素的堆上, MAX-HEAP-INSERT 的时间复杂度是 lh(n).

### 总结
在一个包含 n 个元素的堆中, 所有优先队列的操作都可以在 lg(n) 时间内完成.
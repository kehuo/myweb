# 维护堆的性质
[My Github Link](https://github.com/kehuo/algorithm_py3)

MAX-HEAPIFY 是用于维护最大堆性质的重要过程。 他的输入是一个数组 A 和一个下标 i。在调用 MAX-HEAPIFY 的时
候，我们假定根结点为 LEFT(i) 和 RIGHT(i) 的二叉树都是最大堆, 但是这时 A\[i\] 有可能小于它的孩子, 这样就
违背了最大堆的性质.

MAX-HEAPIFY 通过让 A\[i\] 的值在最大堆中"逐级下降", 从而使得以下标 i 为根结点的子树重新遵循最大堆的性质。

### 伪代码

    MAX-HEAPIFY(A, i)
    1 l = LEFT(i)
    2 r = RIGHT(i)
    3 if l <= A.heap-size and A[l] > A[i]
    4     largest = l
    5 else largest = i
    6 if r <= A.heap-size and A[r] > A[largest]
    7     largest = r
    8 if largest != i
    9     exchange A[i] with A[largest]
    10    MAX-HEAPIFY(A, largest)
    
[插图1]: https://kevinhuo.cool/imgs/introduction_to_algorithms/part2/chapter6/section2/1.jpeg

![插图1]

从上图看出 MAX-HEAPIFY 的执行过程. 在程序的每一步中, 从 A\[i\]、 A\[LEFT(i)\] 和
A\[RIGHT(i)\] 中选出最大的项, 并将其下标存储在 largest 中. 
> 如果A\[i\]最大, 那么以 i 为根结点的子树已经是最大堆了, 程序结束.

> 否则, 最大元素应该是 i 的某个子节点, 则交换 A\[i\]  和 A\[largest\] 的值。 从而使 i 和
i 的孩子都满足最大堆的性质。在交换后，下标是 largest 的节点的值是原来的 A\[i\], 于是以该节点
为根的子树又有可能会违反最大堆的性质。因此，又要对该子树递归调用 MAX-HEAPIFY。
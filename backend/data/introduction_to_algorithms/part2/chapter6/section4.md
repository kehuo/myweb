# 对排序算法
[My Github Link](https://github.com/kehuo/algorithm_py3)

初始的时候, 堆排序算法利用 BUILD-MAX-HEAP 将输入数组 A\[1...n] 建成一个最大堆, 其中 n = A.length.
因为对于一个最大堆数组, 数组中的最大元素总是在 A\[1] 处, 即数组的开头处(Python的数组开始索引是0，
但是这里用 A\[1] 是为了让这段文字和下面的伪代码使用同一个标准)。
我们可以将 A\[1] 和 A\[n] 互换， 我们可以让该元素放到正确的位置。这时，如果我们从堆中去掉节点n (
这个操作可以通过减少 A.heap-size 的值来实现), 在剩余的节点中，原来根的孩子节点仍然是最大堆, 而新的
根节点可能会违背最大堆的性质。为了维护最大堆性质，我们要做的是调用 MAX-HEAPIFY(A, 1), 从而在
A\[1...(n-1)]上构造一个新的最大堆. 堆排序算法会不断地重复这个过程，知道堆的大小从 n-1 降到2.

### 伪代码

    HEAPSORT(A)
    1 BUILD-MAX-HEAP(A)
    2 for i = A.length downto 2
    3     exchange A[1] with A[i]
    4     A.heap-size = A.heap-size - 1
    5     MAX-HEAPIFY(A, 1)

### 下图展示了排序过程 (a) - (k)

[截图1]: https://kevinhuo.cool/imgs/introduction_to_algorithms/part2/chapter6/section4/1.jpg
[截图2]: https://kevinhuo.cool/imgs/introduction_to_algorithms/part2/chapter6/section4/2.jpg

![截图1]

![截图2]

HEAPSORT 的时间复杂度是 nlg(n)

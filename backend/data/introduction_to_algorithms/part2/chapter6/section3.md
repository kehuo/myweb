# 6.3 建堆
[My Github Link](https://github.com/kehuo/algorithm_py3)

我们可以用自底向上的方法利用 MAX-HEAPIFY 把一个大小为 n=A.length 的数组 A\[1...n\] 转换成一个
最大堆。如果我们把 A\[1...n\] 从 n/2 处分成左右2瓣，左半边是左子数组A\[1...(2/n)\], 右半边是 右子数
组 A\[(n/2 + 1)...n\], 那么右子树组中的所有元素，都是整颗树的叶子结点。

我们可以将右半边子数组中的每一个叶子结点，都看成一个 "只包含一个元素的堆", BUILD-MAX-HEAP 过程不
会对这些叶子节点做任何操作。

但是，过程 BUILD-MAX-HEAP 会对树的左半边子数组 A\[1...(n/2)]中的每一个元素结构调用一次 
MAX-HEAPIFY。 具体伪代码如下:


## 伪代码 -- 时间复杂度是 lg(n)

    BUILD-MAX-HEAP(A)
    1 A.heap-size = A.length
    2 for i in (A.length/2) downto 1
    3     MAX-HEAPIFY(A, i)


## 下图形象地描述了一个 BUILD-MAX-HEAP 的过程 (图片仍在 building...)
[截图1]: https://kevinhuo.cool/imgs/introduction_to_algorithms/part2/chapter6/section3/1.jpg


实际上, 用类似的办法, 我们可以通过调用 BUILD-MIN-HEAP 的方法构造一个最小堆，除了将第三行伪代码的
调用替换成 MIN-HEAPIFY 之外, 其他部分 BUILD-MAX-HEAP 和 BUILD-MIN-HEAP 完全相同。
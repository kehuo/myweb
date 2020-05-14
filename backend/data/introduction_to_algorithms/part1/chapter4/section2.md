# 4.2 矩阵乘法的 Strassen 算法
[My Github Link](https://github.com/kehuo/algorithm_py3)


## 引入问题

本节要解决的问题是 “矩阵的乘法”。假设 A = (a\[ij\]) 和 B = (b\[ij]) 都是 nxn 的方阵，则对于
i, j = 1, 2, ..., n, 我们定义 C = A · B ，并且定义 c\[ij] 是 C 中的元素。

我们需要计算 n^^2 个矩阵元素，每个元素是 n 个值的和。下面的过程接受 nxn 矩阵 A 和 B，返回它们
的乘积， --> 即一个 nxn 的方阵 C。假设每一个方阵都有一个属性 rows, 用来给出方阵的行数。

    SQUARE-MATRIX-MULTIPLE(A, B)
    1 n = A.rows
    2 let C be a new nxn matrix
    3 for i = 1 to n
    4     for j = 1 to n
    5         c[ij] = 0
    6         for k = 1 to n
    7             c[ij] = c[ij] + a[ik] · b[kj]
    8 return C
    

## 简单的分支算法

building...
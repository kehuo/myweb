# 8.2 计数排序
[My Github Link](https://github.com/kehuo/algorithm_py3)

## 引言

building...


## 伪代码实现
    COUNTING-SORT(A, B, k)
    1  let C[0..k] be a new array
    2  for i = 0 to k
    3      C[i] = 0
    4  for j = 1 to A.length
    5      C[A[j]] = C[A[j]] + 1
    6  // C[i] now contains the number of elements equal to i.
    7  for i = 1 to k
    8      C[i] = C[i] + C[i-1]
    9  // C[i] now contains the number of elements less than or equal to i.
    10 for j = A.length downto 1
    11     B[C[A[j]]] = A[j]
    12     C[A[j]] = C[A[j]] - 1


## python3 实现

building...


## 算法解释

building...
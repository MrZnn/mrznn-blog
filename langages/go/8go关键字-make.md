---
title: go关键字-make
lang: en-US
---
# make用法

## 定义
&emsp;&emsp;`make()` 函数用于创建切片、映射和通道。它的基本语法是：`make(Type, size)`
其中 Type 是要创建的类型（如切片、映射或通道），size 则是可选参数，用于指定切片、映射或通道的长度或缓冲区大小。

## 案例
```go
1. 创建切片（slice）
slice := make([]Type, size)
Type：切片中元素的类型。
size：可选参数，指定切片的长度（切片中元素的个数）。该参数是可选的，如果不提供，默认创建一个长度为 0 的切片。
// 创建一个长度为 5 的整数切片
slice := make([]int, 5)

// 创建一个长度为 0 的字符串切片
slice := make([]string, 0)

2. 创建映射（map）
mymap := make(map[KeyType]ValueType, size)
KeyType：映射中键的类型。
ValueType：映射中值的类型。
size：可选参数，用于指定映射的初始存储能力（桶的个数），这个参数是可选的。
// 创建一个键为字符串，值为整数的映射
mymap := make(map[string]int)

// 创建一个容量为 100 的键为整数，值为字符串的映射
mymap := make(map[int]string, 100)

3. 创建通道（channel）
channel := make(chan Type, size)
Type：通道中元素的类型。
size：可选参数，指定通道的缓冲区大小。如果不提供，默认创建一个无缓冲通道。
// 创建一个无缓冲通道，用于传递整数类型的元素
channel := make(chan int)

// 创建一个带有缓冲区大小为 10 的通道，用于传递字符串类型的元素
channel := make(chan string, 10)

4. 返回值
make() 函数返回的是对应类型的新实例，切片、映射和通道都是引用类型，因此返回的是它们的引用（指针）。

```

## 总结
1. 使用 make() 函数的好处是它会初始化并分配内存，返回一个可用的实例，而不需要手动进行初始化或赋初值。
2. make() 函数是 Go 语言中用于创建切片、映射和通道的一个重要函数，它简化了相关数据结构的创建和初始化过程。
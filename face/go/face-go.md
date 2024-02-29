---
title: 问题 - go语言
lang: en-US
---

## defer 

&emsp;&emsp;defer 的执行顺序是后进先出。当出现 panic 语句的时候，会先按照 defer 的后进先出的顺序执行，最后才会执行panic

## new() 与 make() 的区别

&emsp;&emsp;(T) 和 make(T,args) 是 Go 语言内建函数，用来分配内存，但适用的类型不同。

&emsp;&emsp;new(T) 会为 T 类型的新值分配已置零的内存空间，并返回地址（指针），即类型为 *T的值。换句话说就是，返回一个指针，该指针指向新分配的、类型为 T 的零值。适用于值类型，如数组、结构体等。

&emsp;&emsp;make(T,args) 返回初始化之后的 T 类型的值，这个值并不是 T 类型的零值，也不是指针 *T，是经过初始化之后的 T 的引用。make() 只适用于 slice、map 和 channel.

```go
func main() {
	list := new([]int)
	list = append(list, 1)
	fmt.Println(list)
}
// first argument to append must be a slice; have list (variable of type *[]int) compiler InvalidAppend
// 参考答案及解析：不能通过编译，new([]int) 之后的 list 是一个 *[]int 类型的指针，不能对指针执行 append 操作。可以使用 make() 初始化之后再用。同样的，map 和 channel 建议使用 make() 或字面量的方式初始化，不要用 new() 
```

## append
### 作用
- 官方解释append函数是向slice里面追加一个或多个元素，然后返回一个和slice一样类型的slice，其签名为 `func append(slice []T, elements...T) []T`
- append 所做的是在切片尾添加元素并返回结果。结果需要返回因为，正如我们手写的 Append，底层的数组可能更改。
- 使用示例：
```go
  x := []int{1,2,3}
  x = append(x, 4, 5, 6)
  fmt.Println(x)
// 打印输出值1 2 3 4 5

func main() {
    s1 := []int{1, 2, 3}
    s2 := []int{4, 5}
    s1 = append(s1, s2)
    fmt.Println(s1)
}
// cannot use s2 (variable of type []int) as int value in argument to appendcompilerIncompatibleAssign

// 参考答案及解析：不能通过编译。append() 的第二个参数不能直接使用 slice，需使用 … 操作符，将一个切片追加到另一个切片上：append(s1,s2…)。或者直接跟上元素，形如：append(s1,1,2,3)。
```

## 函数相关

&emsp;&emsp;在函数有多个返回值时，只要有一个返回值有命名，其他的也必须命名。如果有多个返回值必须加上括号()；如果只有一个返回值且命名也必须加上括号()。这里的第一个返回值有命名 sum，第二个没有命名，所以错误。


## 类型别名与类型定义的区别
&emsp;&emsp;在 Go 语言中，`type MyInt1 int` 定义了一个新类型 MyInt1，它与 int 是不同的类型，即使它们底层类型相同。而 `type MyInt2 = int` 则是类型别名的声明，它将 MyInt2 作为 int 的别名，它们实际上是同一个类型。对 类型转换 `var i1 MyInt1 = MyInt1(i)`
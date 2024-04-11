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


## 类型选择与类型断言
&emsp;&emsp;在 Go 语言中，类型断言（Type Assertion）和类型选择（Type Switch）是两个不同的概念，它们用于处理接口类型和类型检查的不同场景。

### 类型断言（Type Assertion）
&emsp;&emsp;类型断言用于在运行时检查接口值中存储的具体类型，并将该接口值转换为该具体类型。类型断言的语法是 value, ok := interfaceValue.(Type)，其中 interfaceValue 是一个接口类型的值，Type 是我们希望断言的具体类型。value 将会是被断言后的具体类型值，而 ok 是一个布尔值，表示断言是否成功。

&emsp;&emsp;如果断言成功，value 将包含接口值中存储的具体值，ok 将为 true。如果断言失败（即接口值中存储的不是指定的类型），value 将是零值，ok 将为 false，并且不会触发恐慌（panic）。

&emsp;&emsp;类型断言通常用于在编写泛型代码或处理多种类型的值时，确保接口值中存储的是期望的类型，并安全地进行类型转换。

### 类型选择（Type Switch）
&emsp;&emsp;类型选择是一种按顺序从几个类型断言中选择分支的结构。它的语法类似于一般的 switch 语句，但是类型选择中的 case 语句是针对给定接口值所存储的值的类型进行比较，而不是值的比较。

&emsp;&emsp;类型选择的语法是 switch v := i.(type) { case T: // 处理 T 类型的情况 case S: // 处理 S 类型的情况 default: // 处理其他类型的情况 }。在这个结构中，i 是一个接口类型的值，v 将按照 i 中存储的实际类型进行类型断言，并保存在变量 v 中。

&emsp;&emsp;类型选择用于在多个可能的类型之间进行选择，并执行相应的代码块。它类似于类型断言的多个版本，但更加简洁和易读。

&emsp;&emsp;区别和作用
&emsp;&emsp;类型断言和类型选择的主要区别在于它们的用途和语法结构。类型断言用于在运行时检查接口值的具体类型，并将其转换为该类型。它主要用于单个类型断言的情况。而类型选择用于在多个可能的类型之间进行选择，并执行相应的代码块。它主要用于处理多种类型的值，并根据实际类型执行不同的操作。

&emsp;&emsp;总结来说，类型断言用于单个类型的检查和转换，而类型选择用于多个类型的选择和分支处理。两者都是处理接口类型和类型检查的重要工具，但具有不同的语法和用途。

##  接口、结构体和函数来构建可扩展的组件

```go
package main

import "net/http"

type SearchEngine struct {
	Recallers []Recaller //召回，得到搜索结果
	Sorter    Sorter
}

type SearchEngine2 struct {
	Recallers []func() []int //召回，得到搜索结果
	Sorter    func([]int) []int
}

type Recaller interface {
	Recall() []int
}

type Sorter interface {
	Sort([]int) []int
}

// 具体的召回策略
func r() []int {
	return nil
}

// 具体的排序策略
func s([]int) []int {
	return nil
}

type Rec struct{}

func (Rec) Recall() []int {
	return r()
}

type RecallType func() []int

func (rt RecallType) Recall() []int {
	return rt()
}

func main() {
	se := SearchEngine{
		Recallers: []Recaller{Rec{}},
	}
	_ = se

	se2 := SearchEngine2{
		Recallers: []func() []int{r},
		Sorter:    s,
	}
	_ = se2

	se3 := SearchEngine{
		Recallers: []Recaller{RecallType(r)},
	}
	_ = se3

	http.Handle("", http.HandlerFunc(Boy))

}

func Boy(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Boy"))
}

```

## 常见1 - redundant type from array, slice, or map composite literalsimplifycompositelit(default)

&emsp;&emsp;举例
```go
var m = map[string]Math{  
	"foo": Math{2, 3},  
}

简写

var m = map[string]Math{  
	"foo": {2, 3}, // 省略了 Math 类型  
}
```

## 常见2 - cannot assign to struct field m["foo"].x in map

&emsp;&emsp;错误原因：对于类似 X = Y的赋值操作，必须知道 X 的地址，才能够将 Y 的值赋给 X，但 go 中的 map 的 value 本身是不可寻址的。

&emsp;&emsp;两个解决办法:

```go
// 1.使用临时变量
type Math struct {
    x, y int
}

var m = map[string]Math{
    "foo": Math{2, 3},
}

func main() {
    tmp := m["foo"]
    tmp.x = 4
    m["foo"] = tmp
    fmt.Println(m["foo"].x)
}

// 2.修改数据结构
type Math struct {
    x, y int
}

var m = map[string]*Math{
    "foo": &Math{2, 3},
}

func main() {
    m["foo"].x = 4
    fmt.Println(m["foo"].x)
    fmt.Printf("%#v", m["foo"])   // %#v 格式化输出详细信息
}
```

## 常见3 - 外部引用

[50 Shades of Go：新 Golang 开发人员的陷阱、陷阱和常见错误](https://golang50shad.es/)


 
[An image](/shadesofgo.html)
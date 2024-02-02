---
title: go关键字-defer
lang: en-US
---
# defer用法

## 定义
&emsp;&emsp;defer是go中一种延迟调用机制，defer后面的函数只有在当前函数执行完毕后才能执行，将延迟的语句按defer的逆序进行执行，也就是说先被defer的语句最后被执行，最后被defer的语句，最先被执行，通常用于释放资源。

## 案例
```go
func func1(){
    fmt.Println("我是 func1")
}
func func2(){
    fmt.Println("我是 func2")
}
func func3(){
    fmt.Println("我是 func3")
}
func main(){
    defer func1()
    defer func2()
    defer func3()
    fmt.Println("main1")
    fmt.Println("main2")
}

func main(){
   i:= 0
   defer func(a int) {
		fmt.Println(a)
	}(i)
    i++
}

func main(){
   i:= 0
   defer func(a *int) {
		fmt.Println(*a)
	}(&i)
    i++
}


func main()  {
    defer func() {
        //捕获异常
       if err := recover(); err != nil{
           fmt.Println(err)
       }else {
           fmt.Println("fatal")
       }
    }()
    //抛出异常
    panic("panic")
}


func function(index int, value int) int {
    fmt.Println(index)
    return index
}
func main() {
    defer function(1, function(3, function(5, 0)))
    defer function(2, function(4, 0))
}
结果：
5
3
4
2
1
```

## 总结
1. defer是go中一种延迟调用机制，defer后面的函数只有在当前函数执行完毕后才能执行。
2. 多个defer出现的时候，它会把defer之后的函数压入一个栈中延迟执行，也就是先进后出。
3. defer后面的函数值在入栈的时候就决定了。
4. defer 最大的功能是 panic 后依然有效,我们可以在defer中进行recover，如果defer中包含recover，则程序将不会再进行panic，实现try catch机制。
---
title: time.After和time.Second区别
lang: en-US
---

## <-time.After(5 * time.Second)：

1. 这是 Go 语言中的一种非阻塞等待延时的方式。
2. time.After(5 * time.Second) 返回一个类型为 <-chan time.Time 的通道，该通道将在5秒后发送一个时间值。
3. 使用 <- 操作符可以在通道有值时接收到该时间值，通常用于执行在一段时间后的某个操作。
4. 优点是不会阻塞其他 goroutines 的执行，可以在等待的同时执行其他操作。

    ```go
    select {
    case <-time.After(5 * time.Second):
        fmt.Println("5 seconds have passed")
    }
    ```

## time.Second(5 * time.Second)

1. time.Sleep 是一个直观的方式，直接让当前 goroutine 在指定的时间内休眠。
2. 这是一种阻塞的方式，整个程序或当前 goroutine 在休眠期间无法执行其他操作。
3. 通常用于简单的等待操作，而不需要同时执行其他任务。

    ```go
    time.Sleep(5 * time.Second)
    fmt.Println("5 seconds have passed")
    ```

## time.NewTimer(5 * time.Second)：

1. time.NewTimer 返回一个 time.Timer 类型的值，该值具有一个 C 属性，是一个通道 (<-chan time.Time)。
2. time.Timer 可以在预定的时间之后向其 C 通道发送一个时间值。你可以通过 <-timer.C 操作来阻塞等待该时间值。
3. time.Timer 提供了一些额外的方法，例如 Stop() 可以停止定时器，Reset(d time.Duration) 可以重新设置定时器的持续时间。
    ```go
    timer := time.NewTimer(5 * time.Second)
    <-timer.C
    fmt.Println("5 seconds have passed")
    ```

## 总结

&emsp;&emsp;在总体上，<-time.After(5 * time.Second) 更加灵活，它可以与 select 结合使用，可以在等待的同时执行其他任务。而 time.Sleep(5 * time.Second) 是一种直观且简单的等待方式，但在等待期间会阻塞当前 goroutine 的执行。选择使用哪种方式取决于具体的需求和场景。
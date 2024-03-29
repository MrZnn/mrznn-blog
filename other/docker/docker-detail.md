---
title: docker详情
lang: en-US
---
## Docker overview

&emsp;&emsp;Docker 是一个用于开发、发布和运行应用程序的开放平台。 Docker 使您能够将应用程序与基础结构分开，以便 您可以快速交付软件。借助 Docker，您可以管理基础架构 以与管理应用程序相同的方式。通过利用 Docker 的 用于交付、测试和部署代码的方法，您可以 显著减少编写代码和在生产环境中运行代码之间的延迟。

## Docker architecture

&emsp;&emsp;Docker 使用客户端-服务器架构。Docker 客户端与 Docker 守护程序，它负责构建、运行和 分发 Docker 容器。Docker 客户端和守护程序可以 在同一系统上运行，也可以将 Docker 客户端连接到远程 Docker 守护 进程。Docker 客户端和守护程序使用 REST API 通过 UNIX 进行通信 套接字或网络接口。另一个 Docker 客户端是 Docker Compose， 这使您可以使用由一组容器组成的应用程序。

&emsp;&emsp;Docker uses a client-server architecture. The Docker client talks to the Docker daemon, which does the heavy lifting of building, running, and distributing your Docker containers. The Docker client and daemon can run on the same system, or you can connect a Docker client to a remote Docker daemon. The Docker client and daemon communicate using a REST API, over UNIX sockets or a network interface. Another Docker client is Docker Compose, that lets you work with applications consisting of a set of containers.

## Docker daemon

&emsp;&emsp;The Docker daemon () listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes. A daemon can also communicate with other daemons to manage Docker services.

## 底层技术
&emsp;&emsp;Docker 是用Go 编程语言并采取 利用 Linux 内核的多个功能来提供其功能。 Docker 使用一种称为“提供独立工作区”的技术 称为容器。运行容器时，Docker 会创建一组 该容器的命名空间。namespaces

&emsp;&emsp;这些命名空间提供隔离层。容器的每个方面都运行 在单独的命名空间中，其访问权限仅限于该命名空间。
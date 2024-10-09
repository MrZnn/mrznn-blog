---
title: docker rootfs
lang: en-US
---
## Docker hub pull
```shell
vi /etc/docker/daemon.json
{
    "registry-mirrors": ["https://docker.rainbond.cc"]
}


systemctl daemon-reload 
systemctl restart docker

docker pull docker.rainbond.cc/[NAME]:[TAG]
```
&emsp;&emsp;

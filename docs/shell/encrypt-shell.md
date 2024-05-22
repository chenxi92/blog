# How to encrypt our shell script? 

In order to avoid leak our sensitive data, we should always encrypted our shell script in product environment.

The following is the simplest way to achieve it!



## Encrypt

First make sure the script is an executable file. 

Ues the following command to make the script to be a executable file:

```shell
chmod +rx <shell-script-path>
```



Second levelage the `gzexe` command to compress the shell:

```shell
gzexe <shell-script-path>
```



There will be generate a `<shell-name>~` format file as a backup once execute `gzexe` success.



## Decrypt

To get the original shell, use the following command:

```shell
gzexe -d <shell-script-path>
```


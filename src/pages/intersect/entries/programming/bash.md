---
title: Bash/Terminal
eleventyNavigation:
  key: Bash
  parent: Programming
---

I use [iTerm](https://iterm2.com) with [ZSH](https://www.zsh.org) and [Oh My Zsh](https://ohmyz.sh). My dotfiles are available [on Github](https://github.com/rknightuk/dotfiles). 


### Make Directory

```bash
mkdir directory_name
```

### Move File

```bash
mv myfile.txt new_location/myfile.txt

# Use move to rename a file in place
mv old_name.txt new_name.txt
```

### View Contents of File

```bash
cat myfile.txt
```

### Write or Append to File

```bash
# Overwrite existing contents
echo "Some content" > myfile.txt

# Append to content
echo "Some content" >> myfile.txt
```

### Diff Two Files

```bash
diff file1.txt file2.txt

# open in VSCode
diff file1.txt file2.txt | code -

# open in Sublime Text
diff file1.txt file2.txt | sublime -n
```

### Batch Image Resize

Using [sips](https://ss64.com/osx/sips.html) (scriptable image processing system):

```bash
$ sips -Z 640 *.jpg
```

### Invert Image Colours

```bash
for FILE in *; do convert $FILE -channel RGB -negate $FILE; done
```

### QuickLook a File

```bash
qlmanage -p myfile.txt
```

### Output to Variable

```bash
VARIABLE=$(pwd)
```

### Show Calendar

```bash
$ cal
$ cal -y 2021
```

### Variable is null

```bash
if [ -z "$VAR" ]; then
    echo "VAR is null"
    exit
fi
```

### Output file list

```bash
for file in ./dir/*; do
    echo "${file##*/}"
done
```
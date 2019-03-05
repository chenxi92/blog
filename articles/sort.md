### 二分查找法

**适用范围：**当数据量很大适宜采用该方法。

**前提条件：** 数据需是排好序的

**基本思想：** 假设数据是按升序排序的，对于给定值x，从序列的中间位置开始比较，如果当前位置值等于x，则查找成功；若x小于当前位置值，则在数列的前半段 中查找；若x大于当前位置值则在数列的后半段中继续查找，直到找到为止。

**代码实现：**

```
// Sort.m
+ (NSInteger)binarySearch:(NSArray *)array target:(id)key {
    NSMutableArray *arr = [NSMutableArray arrayWithArray:array];
    NSInteger left = 0;
    NSInteger right = [arr count] - 1;

    while (right >= left) {
        // NSInteger middle = (right + left) / 2; 如果right的值快要溢出边界，该操作会导致值溢出
        NSInteger middle = right / 2 + left / 2;
        if (arr[middle] == key) {
            return middle;
        } else if (arr[middle] > key) {
            right = middle - 1;
        } else if (arr[middle] < key) {
            left = middle + 1;
        }
    }
    return -1;
}

```

测试：

```
NSInteger binary = [Sort binarySearch:@[@"2",@"5",@"6",@"8",@"9", @"12"] target:@"8"];
NSLog(@"%ld",binary);
```


### 冒泡排序

**参考:** [冒泡排序](https://mp.weixin.qq.com/s/wO11PDZSM5pQ0DfbQjKRQA) 

**基本思想：使用双循环来进行排序。外部循环控制所有的回合，内部循环代表每一轮的冒泡处理，先进行元素比较，再进行元素交换**

**代码实现：**

```
// Sort.m
+ (NSMutableArray *)bubbleSort:(NSArray *)array {
    NSMutableArray *arr = [NSMutableArray arrayWithArray:array];
    for (int i = 0; i < arr.count; i++) {
        for (int j = 0; j < [arr count] - i - 1; j++) {
            if ([arr[j] intValue] > [arr[j+1] intValue]) { // 升序排列
                [arr exchangeObjectAtIndex:j withObjectAtIndex:j + 1];
            }
        }
    }
    return arr;
}
```

代码优化1：**判断如果数列已经有序，并且做出标记，剩下的几轮排序就可以不必执行，提早结束工作**

```
// Sort.m
+ (NSMutableArray *)bubbleSortOptimize1:(NSArray *)array {
    NSMutableArray *arr = [NSMutableArray arrayWithArray:array];
    for (int i = 0; i < arr.count; i++) {
        BOOL isSorted = YES; // 标记是否有序
        for (int j = 0; j < arr.count - i - 1; j++) {
            if ([arr[j] intValue] > [arr[j+1] intValue]) { // 升序排列
                [arr exchangeObjectAtIndex:j withObjectAtIndex:j + 1];
                // 有元素交换，所以不是有序，标记变为NO
                isSorted = NO;
            }
            
        }
        if (isSorted) break;
    }
    return arr;
}

```

代码优化2：**判断有序区间**

```
// Sort.m
+ (NSMutableArray *)bubbleSortOptimize2:(NSArray *)array {
    NSMutableArray *arr = [NSMutableArray arrayWithArray:array];
    NSInteger lastExchangeIndex = 0; // 记录最后一次交换的位置
    NSInteger sortBorder = arr.count - 1; // 无序数列的边界，每次比较只需要比到这里为止
    for (int i = 0; i < arr.count; i++) {
        BOOL isSorted = YES; // 标记是否有序
        for (int j = 0; j < sortBorder; j++) {
            if ([arr[j] intValue] > [arr[j+1] intValue]) {
                [arr exchangeObjectAtIndex:j withObjectAtIndex:j + 1];
                // 有元素交换，所以不是有序，标记变为NO
                isSorted = NO;
                // 把无序数列的边界更新为最后一次交换元素的位置
                lastExchangeIndex = j;
            }
        }
        sortBorder = lastExchangeIndex;
        if (isSorted) break;
    }
    return arr;
}
```

测试：

```
NSMutableArray *array = [NSMutableArray arrayWithObjects:@3, @4, @2, @1, @5, @6, @7, @8, nil];
        
NSLog(@"bubble sort = %@", [Sort bubbleSort:array]);
NSLog(@"bubble sort optimize1 = %@", [Sort bubbleSortOptimize1:array]);
NSLog(@"bubble sort optimize2 = %@", [Sort bubbleSortOptimize2:array]);
NSLog(@"origin array = %@", array);
```

### 快速排序

**参考：**[快速排序](https://mp.weixin.qq.com/s/PQLC7qFjb74kt6PdExP8mw)

**基本思想：** 在每一轮挑选一个基准元素，并让其他比它大的元素移动到数列一边，比它小的元素移动到数列的另一边，从而把数列拆解成了两个部分。这种思路就叫做**分治法**。

**代码实现：**

```
// Sort.m
+ (void)quickSort:(NSMutableArray *)array startIndex:(NSInteger)startIndex endIndex:(NSInteger)endIndex {
    if (startIndex >= endIndex) {
        return;
    }
    NSInteger left = startIndex;
    NSInteger right = endIndex;
    // 取第一个位置的元素作为基准元素
    NSInteger pivot = [array[startIndex] integerValue];
    // 坑的位置，初始等于pivot的位置
    NSInteger index = startIndex;
    
    //大循环在左右指针重合或者交错时结束
    while (right >= left) {
        //right指针从右向左进行比较
        while (right >= left) {
            if ([array[right] integerValue] < pivot) {
                [array exchangeObjectAtIndex:left withObjectAtIndex:right];
                index = right;
                left++;
                break;
            }
            right--;
        }
        
        //left指针从左向右进行比较
        while (right >= left) {
            if ([array[left] integerValue] > pivot) {
                [array exchangeObjectAtIndex:right withObjectAtIndex:left];
                index = left;
                right--;
                break;
            }
            left++;
        }
    }
    array[index] = @(pivot);
    
    [self quickSort:array startIndex:startIndex endIndex:index - 1];
    [self quickSort:array startIndex:index + 1 endIndex:endIndex];
}

```

测试：

```
NSMutableArray *quickArray = [NSMutableArray arrayWithObjects:@4, @7, @6, @5, @9, @3, @2, @8, @1, nil];

NSLog(@"before quick sort = %@", quickArray);
[Sort quickSort:quickArray startIndex:0 endIndex:quickArray.count - 1];
NSLog(@"after quick sort = %@", quickArray);
```
### 插入排序

**参考：** [插入排序](https://blog.51cto.com/9217856/1563523)

**基本思路：** 直接插入排序(Insertion Sort)的基本思想是：每次将一个待排序的记录，按其关键字大小插入到前面已经排好序的子序列中的适当位置，直到全部记录插入完成为止。

**代码实现：**

```
// Sort.m
+ (void)insertSort:(NSMutableArray *)array {
    
    for (int i = 1; i < array.count; i++) {
        NSNumber *temp = array[i];
        int j = i;
        while (j > 0 && [array[j - 1] compare:temp] == NSOrderedDescending) {
            [array exchangeObjectAtIndex:j withObjectAtIndex:j - 1];
            j--;
        }
        array[j] = temp;
    }
}
```

测试：

```
NSMutableArray *insertArray = [NSMutableArray arrayWithObjects:@3, @2, @6, @9, @8, @5, @7, @1, @4, nil];
NSLog(@"before insert sort = %@", insertArray);
[Sort insertSort:insertArray];
NSLog(@"after insert sort = %@", insertArray);
```

### 鸡尾酒排序

**参考** [鸡尾酒排序](https://mp.weixin.qq.com/s/CoVZrvis6BnxBQgQrdc5kA)

**优点：**在特定条件下，减少排序的回合数

**缺点：**代码量几乎扩大了一倍

**应用场景：**大部分元素已经有序

**代码实现：**

```
// Sort.m
+ (void)cockTailSort:(NSMutableArray *)array {
    
    for (NSInteger i = 0; i < array.count/2; i++) {
        //有序标记，每一轮的初始是true
        BOOL isSorted = YES;
        //奇数轮，从左向右比较和交换
        for (NSInteger j = i; j < array.count - i - 1; j++) {
            if ([array[j] compare:array[j + 1]] == NSOrderedDescending) {
                [array exchangeObjectAtIndex:j withObjectAtIndex:j + 1];
                isSorted = NO;
            }
        }
        if (isSorted) break;
        
        //偶数轮之前，重新标记为true
        isSorted = YES;
        //偶数轮，从右向左比较和交换
        for (NSInteger j = array.count - i - 1; j > i; j--) {
            if ([array[j] compare:array[j - 1]] == NSOrderedAscending) {
                [array exchangeObjectAtIndex:j withObjectAtIndex:j - 1];
                isSorted = NO;
            }
        }
        if (isSorted) break;
    }
}
```

**代码优化**

```
// Sort.m
+ (void)cockTailSortOptimize:(NSMutableArray *)array {
    //记录右侧最后一次交换的位置
    NSInteger lastRightExchangeIndex = 0;
    //记录左侧最后一次交换的位置
    NSInteger lastLeftExchangeIndex = 0;
    //无序数列的右边界，每次比较只需要比到这里为止
    NSInteger rightSortBorder = array.count - 1;
    //无序数列的左边界，每次比较只需要比到这里为止
    NSInteger leftSortBorder = 0;
    
    for (NSInteger i = 0; i < array.count/2; i++) {
        
        //有序标记，每一轮的初始是YES
        BOOL isSorted = YES;
        //奇数轮，从左向右比较和交换
        for (NSInteger j = leftSortBorder; j < rightSortBorder; j++) {
            if ([array[j] compare:array[j + 1]] == NSOrderedDescending) {
                [array exchangeObjectAtIndex:j withObjectAtIndex:j + 1];
                isSorted = NO;
                lastRightExchangeIndex = j;
            }
        }
        rightSortBorder = lastRightExchangeIndex;
        if (isSorted) break;
        
        //偶数轮之前，重新标记为YES
        isSorted = YES;
        //偶数轮，从右向左比较和交换
        for (NSInteger j = rightSortBorder; j > leftSortBorder; j--) {
            if ([array[j] compare:array[j - 1]] == NSOrderedAscending) {
                [array exchangeObjectAtIndex:j withObjectAtIndex:j - 1];
                isSorted = NO;
                lastLeftExchangeIndex = j;
            }
        }
        leftSortBorder = lastLeftExchangeIndex;
        if (isSorted) break;
    }
}
```

测试：

```
NSMutableArray *cockTailArray = [NSMutableArray arrayWithObjects:@2, @3, @4, @5, @6, @7, @8, @1, nil];
NSLog(@"before cock tail array = %@", cockTailArray);
[Sort cockTailSort:cockTailArray];
NSLog(@"after cock tail array = %@", cockTailArray);
        
NSMutableArray *cockTailArrayOptimize = [NSMutableArray arrayWithObjects:@2, @3, @4, @5, @6, @7, @8, @1, nil];
NSLog(@"before cock tail array optimize = %@", cockTailArrayOptimize);
[Sort cockTailSortOptimize:cockTailArrayOptimize];
NSLog(@"after cock tail array optimize = %@", cockTailArrayOptimize);
```
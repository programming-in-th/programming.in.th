import { Task } from '@prisma/client'
import { FC, memo } from 'react'

const SolutionTab: FC<{ task: Task }> = ({ task }) => {
  return (
    <div>
      <pre className="text-sm overflow-auto w-full my-4 p-4 bg-slate-50 rounded-mg">
        {`#include <bits/stdc++.h>

using namespace std;

int a, b, c;

int main () {
    scanf("%d %d %d", &a, &b, &c);
    int sum = a + b + c;
    if (sum <= 100 && sum >= 80) {
        printf("A");
    } else if (sum < 80 && sum >= 75) {
        printf("B+");
    } else if (sum < 75 && sum >= 70) {
    printf("B");
    } else if (sum < 70 && sum >= 65) {
        printf("C+");
    } else if (sum < 65 && sum >= 60) {
        printf("C");
    } else if (sum < 60 && sum >= 55) {
        printf("D+");
    } else if (sum < 55 && sum >= 50) {
        printf("D");
    } else if (sum < 50 && sum >= 0) {
        printf("F");
    }
}`}
      </pre>
    </div>
  )
}

export default memo(SolutionTab)

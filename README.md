# action-aws-iam-authenticator

Github Action. Install specific version of `aws-iam-authenticator` (https://github.com/kubernetes-sigs/aws-iam-authenticator)

## Usage

```

name: Test

on:
  push:
    branches:    
      - master

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: prepor/action-aws-iam-authenticator@master
    - run: aws-iam-authenticator version
```

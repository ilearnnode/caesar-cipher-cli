# caesar-cipher-cli

### CLI tool to encode and decode a text by Caesar cipher.

#### Installation:
```
npm install
```

#### Usage:
```
node cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
node cli --action decode --shift 7 --input input.txt --output output.txt
```

#### Options:  
```
-s, --shift: a shift  
-a, --action: an action encode/decode  
-i, --input: an input file (optional)  
-o, --output: an output file (optional)  
```

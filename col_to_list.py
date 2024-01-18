f = open("out_col_to_list", "r")
lines = f.readlines()
lst = []
for l in lines:
    lst.append(float(l.strip().replace(",", ".")))
f.close()

f = open("out_col_to_list", "w")
f.write(str(lst))
f.close()    
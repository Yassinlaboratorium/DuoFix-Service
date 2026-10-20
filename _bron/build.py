import re,sys
import os; d=os.path.dirname(os.path.abspath(__file__))+'/../'
art=open(d+'_bron/art.js').read(); css=open(d+'_bron/brand.css').read()+open(d+'_bron/extra.css').read()
tpl=open(d+'_bron/brand.html').read(); js=open(d+'_bron/brand.js').read()
def variant(text,keep,drop,html):
    o,c=(('<!--','-->') if html else ('/*','*/'))
    text=re.sub(re.escape(o+drop+c)+r'.*?'+re.escape(o+'/'+drop+c),'',text,flags=re.S)
    return text.replace(o+keep+c,'').replace(o+'/'+keep+c,'')
for name,keep,drop,title,pak in [('groei','G','P','DuoFix Service Groei','Pakket Groei'),('pro','P','G','DuoFix Service Pro','Pakket Pro')]:
    h=variant(tpl,keep,drop,True); j=variant(js,keep,drop,False)
    h=h.replace('{{TITLE}}',title).replace('{{PAKKET}}',pak).replace('{{CSS}}',css).replace('{{ART}}',art).replace('{{JS}}',j)
    open(d+'_bron/_'+name+'.html','w').write(h); print(name,len(h))

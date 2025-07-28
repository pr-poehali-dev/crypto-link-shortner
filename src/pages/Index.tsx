import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface UserBalance {
  btc: number;
  eth: number;
  usdt: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  currency: 'BTC' | 'ETH' | 'USDT';
  completed: boolean;
}

const Index = () => {
  const [balance, setBalance] = useState<UserBalance>({ btc: 0.00001234, eth: 0.0542, usdt: 15.67 });
  const [faucetCooldown, setFaucetCooldown] = useState(0);
  const [tasks] = useState<Task[]>([
    { id: 1, title: 'Посетить партнерский сайт', description: 'Перейти по ссылке и провести 30 секунд на сайте', reward: 0.000001, currency: 'BTC', completed: false },
    { id: 2, title: 'Подписаться на Telegram', description: 'Подписаться на наш официальный канал', reward: 0.001, currency: 'ETH', completed: false },
    { id: 3, title: 'Поделиться в соцсетях', description: 'Поделиться ссылкой на сайт в любой соцсети', reward: 5, currency: 'USDT', completed: true },
    { id: 4, title: 'Ежедневный вход', description: 'Заходить на сайт каждый день в течение недели', reward: 0.000005, currency: 'BTC', completed: false },
  ]);

  useEffect(() => {
    if (faucetCooldown > 0) {
      const timer = setTimeout(() => setFaucetCooldown(faucetCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [faucetCooldown]);

  const handleFaucetClaim = () => {
    const rewards = [
      { amount: 0.000001, currency: 'BTC' as const },
      { amount: 0.001, currency: 'ETH' as const },
      { amount: 1, currency: 'USDT' as const }
    ];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    
    setBalance(prev => ({
      ...prev,
      [reward.currency.toLowerCase()]: prev[reward.currency.toLowerCase() as keyof UserBalance] + reward.amount
    }));
    setFaucetCooldown(300); // 5 minutes cooldown
  };

  const formatBalance = (amount: number, currency: string) => {
    if (currency === 'BTC') return amount.toFixed(8);
    if (currency === 'ETH') return amount.toFixed(6);
    return amount.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-space via-purple-900 to-black text-white">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-neon-cyan rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-space-purple rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-cosmic-gray rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon-cyan rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-neon-cyan/20 bg-black/30 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Rocket" size={32} className="text-neon-cyan" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-space-purple bg-clip-text text-transparent">
                  CRYPTO COSMOS
                </h1>
              </div>
              <nav className="flex space-x-6">
                <Button variant="ghost" className="text-neon-cyan hover:bg-neon-cyan/10">Главная</Button>
                <Button variant="ghost" className="text-white hover:bg-white/10">Кран</Button>
                <Button variant="ghost" className="text-white hover:bg-white/10">Задания</Button>
                <Button variant="ghost" className="text-white hover:bg-white/10">Профиль</Button>
              </nav>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-neon-cyan via-space-purple to-cosmic-gray bg-clip-text text-transparent">
              Заработай криптовалюту в космосе
            </h2>
            <p className="text-xl text-gray-300 mb-8">Выполняй задания, используй кран и получай BTC, ETH, USDT</p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-black/40 border-neon-cyan/30 backdrop-blur-md animate-glow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-neon-cyan">
                  <span>Bitcoin</span>
                  <Icon name="Bitcoin" size={24} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{formatBalance(balance.btc, 'BTC')} BTC</p>
                <p className="text-sm text-gray-400">≈ ${(balance.btc * 45000).toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-space-purple/30 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-space-purple">
                  <span>Ethereum</span>
                  <Icon name="Zap" size={24} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{formatBalance(balance.eth, 'ETH')} ETH</p>
                <p className="text-sm text-gray-400">≈ ${(balance.eth * 2500).toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-cosmic-gray/30 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-cosmic-gray">
                  <span>USDT</span>
                  <Icon name="DollarSign" size={24} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{formatBalance(balance.usdt, 'USDT')} USDT</p>
                <p className="text-sm text-gray-400">≈ ${balance.usdt.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Faucet Section */}
            <Card className="bg-black/40 border-neon-cyan/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-neon-cyan">
                  <Icon name="Droplets" size={24} />
                  <span>Космический кран</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-300">Получай бесплатную криптовалюту каждые 5 минут!</p>
                  
                  {faucetCooldown > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Следующая выплата через: {Math.floor(faucetCooldown / 60)}:{(faucetCooldown % 60).toString().padStart(2, '0')}</p>
                      <Progress value={(300 - faucetCooldown) / 3} className="w-full" />
                    </div>
                  ) : (
                    <Button 
                      onClick={handleFaucetClaim}
                      className="w-full bg-gradient-to-r from-neon-cyan to-space-purple hover:from-neon-cyan/80 hover:to-space-purple/80 text-black font-bold"
                    >
                      <Icon name="Gift" size={20} className="mr-2" />
                      Получить награду
                    </Button>
                  )}

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-neon-cyan/10 rounded">
                      <p className="text-neon-cyan">BTC</p>
                      <p>0.000001</p>
                    </div>
                    <div className="text-center p-2 bg-space-purple/10 rounded">
                      <p className="text-space-purple">ETH</p>
                      <p>0.001</p>
                    </div>
                    <div className="text-center p-2 bg-cosmic-gray/10 rounded">
                      <p className="text-cosmic-gray">USDT</p>
                      <p>1.00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tasks Section */}
            <Card className="bg-black/40 border-space-purple/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-space-purple">
                  <Icon name="Target" size={24} />
                  <span>Космические задания</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{task.title}</h4>
                        <Badge 
                          variant={task.completed ? "default" : "secondary"}
                          className={task.completed ? "bg-green-600" : "bg-yellow-600"}
                        >
                          {task.completed ? "Выполнено" : "Активно"}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-neon-cyan">
                          {formatBalance(task.reward, task.currency)} {task.currency}
                        </span>
                        {!task.completed && (
                          <Button size="sm" variant="outline" className="text-xs border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10">
                            Выполнить
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-black/40 border-white/10 backdrop-blur-md p-4 text-center">
              <Icon name="Users" size={32} className="mx-auto mb-2 text-neon-cyan" />
              <p className="text-2xl font-bold text-white">12,542</p>
              <p className="text-sm text-gray-400">Активных космонавтов</p>
            </Card>
            <Card className="bg-black/40 border-white/10 backdrop-blur-md p-4 text-center">
              <Icon name="Coins" size={32} className="mx-auto mb-2 text-space-purple" />
              <p className="text-2xl font-bold text-white">₿ 1.234</p>
              <p className="text-sm text-gray-400">Всего выплачено</p>
            </Card>
            <Card className="bg-black/40 border-white/10 backdrop-blur-md p-4 text-center">
              <Icon name="CheckCircle" size={32} className="mx-auto mb-2 text-cosmic-gray" />
              <p className="text-2xl font-bold text-white">45,123</p>
              <p className="text-sm text-gray-400">Заданий выполнено</p>
            </Card>
            <Card className="bg-black/40 border-white/10 backdrop-blur-md p-4 text-center">
              <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold text-white">98.7%</p>
              <p className="text-sm text-gray-400">Аптайм</p>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">© 2024 Crypto Cosmos. Исследуй космос криптовалют.</p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-neon-cyan">
                  <Icon name="MessageCircle" size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-space-purple">
                  <Icon name="Send" size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cosmic-gray">
                  <Icon name="Globe" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
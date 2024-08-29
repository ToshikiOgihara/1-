class GameController < ApplicationController
  def index
    #@paijun = majon_pais.sample(majon_pais.size)
  end
  
  def test
    tileAll = Tile.all()
    @rest_tiles = tileAll.sample(14 + 10)
    
    #binding.pry()
    # sliceメソッドのびっくりマーク。
    #haipai = @rest_tiles.slice!(0..13)
    if Rails.cache.exist?('discard_tiles')
      Rails.cache.clear('discard_tiles')
    end
    
    @hand_tiles = @rest_tiles.slice!(0..12)
    @next_tile = @rest_tiles.slice!(0)
    
    Rails.cache.write('hand_tiles', @hand_tiles)
    Rails.cache.write('rest_tiles', @rest_tiles)
    
    if Rails.cache.exist?('discard_tiles')
      @discard_tiles = Rails.cache.read('discard_tiles')
    else
      @discard_tiles = Array.new()
    end
    
    #binding.pry()
  end
  
  def discard
  end
  
  def result
  end
  
  def tsumo
    @foo = 1
    render :result
    # 牌順から1つ減らす。
    # @current_total_paijun
    # 牌順から1つ取り出した牌は手牌の一番右に表示する。
  end
end

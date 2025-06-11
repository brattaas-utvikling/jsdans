// src/components/Cart.tsx - FIXED with migration support for old cart data
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Users, 
  Clock, 
  MapPin, 
  Tag, 
  AlertTriangle,
  Copy,
  RefreshCw,
  Settings,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { formatPrice } from '../utils/pricing';
import type { CartSummary, Schedule, CartItemWithPricing } from '../types';

interface CartProps {
  cartSummary: CartSummary;
  schedules: Schedule[];
  onRemoveItem: (itemId: string) => void;
  onDuplicateItem?: (itemId: string) => void;
  onCheckout: () => void;
  onRefreshCart?: () => void;
  onToggleFamilyDiscount?: (itemId: string) => void;
  isCartExpired?: boolean;
  isProcessing?: boolean;
  error?: string | null;
}

// 🔧 MIGRATION HELPER: Handle old cart data format
const getStudentNames = (item: CartItemWithPricing) => {
  // NEW FORMAT: Has firstName/lastName
  if (item.studentFirstName && item.studentLastName) {
    return {
      firstName: item.studentFirstName,
      lastName: item.studentLastName,
      fullName: `${item.studentFirstName} ${item.studentLastName}`
    };
  }
  
  // OLD FORMAT: Has only studentName - split it
  if (item.studentName) {
    const nameParts = item.studentName.trim().split(' ');
    const firstName = nameParts[0] || 'Ukjent';
    const lastName = nameParts.slice(1).join(' ') || 'Etternavn';
    
    return {
      firstName,
      lastName, 
      fullName: item.studentName
    };
  }
  
  // FALLBACK: No name at all
  return {
    firstName: 'Ukjent',
    lastName: 'Navn',
    fullName: 'Ukjent Navn'
  };
};

// Helper function to group cart items by family (last name) with migration support
const groupItemsByFamily = (items: CartItemWithPricing[]) => {
  const groups: Record<string, CartItemWithPricing[]> = {};
  
  items.forEach(item => {
    const names = getStudentNames(item);
    const lastName = names.lastName || 'Ukjent';
    
    if (!groups[lastName]) {
      groups[lastName] = [];
    }
    groups[lastName].push(item);
  });
  
  return groups;
};

// Helper function to determine if items likely represent a family
const isLikelyFamily = (items: CartItemWithPricing[]): boolean => {
  if (items.length < 2) return false;
  
  const lastNames = items.map(item => {
    const names = getStudentNames(item);
    return names.lastName.toLowerCase().trim();
  });
  const uniqueLastNames = new Set(lastNames);
  
  // If all have same last name, very likely family
  if (uniqueLastNames.size === 1) return true;
  
  // If most have same last name, likely family
  const mostCommonLastName = [...lastNames].sort((a, b) => 
    lastNames.filter(name => name === a).length - lastNames.filter(name => name === b).length
  ).pop();
  
  const sameLastNameCount = lastNames.filter(name => name === mostCommonLastName).length;
  return sameLastNameCount >= items.length * 0.7; // 70% threshold
};

export const Cart: React.FC<CartProps> = ({ 
  cartSummary, 
  schedules = [],
  onRemoveItem, 
  onDuplicateItem,
  onCheckout,
  onRefreshCart,
  onToggleFamilyDiscount,
  isCartExpired = false,
  isProcessing = false,
  error = null
}) => {
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);

  const handleRemoveItem = async (itemId: string) => {
    setRemovingItemId(itemId);
    try {
      onRemoveItem(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleDuplicateItem = (itemId: string) => {
    if (onDuplicateItem) {
      try {
        onDuplicateItem(itemId);
      } catch (error) {
        console.error('Failed to duplicate item:', error);
        alert(`Kunne ikke duplisere student: ${error.message}`);
      }
    }
  };

  const handleToggleFamilyDiscount = (itemId: string) => {
    if (onToggleFamilyDiscount) {
      try {
        onToggleFamilyDiscount(itemId);
      } catch (error) {
        console.error('Failed to toggle family discount:', error);
        alert(`Kunne ikke endre familierabatt: ${error.message}`);
      }
    }
  };

  if (!cartSummary.hasItems) {
    return (
      <Card className="max-w-md">
        <CardContent className="text-center py-8">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">Handlekurven er tom</p>
          <p className="text-sm text-gray-400 mt-1">
            Legg til studenter for å komme i gang
          </p>
        </CardContent>
      </Card>
    );
  }

  const getScheduleDetails = (scheduleId: string): Schedule | undefined => {
    return schedules.find(s => s.$id === scheduleId);
  };

  // Group items by family (with migration support)
  const familyGroups = groupItemsByFamily(cartSummary.items);
  const familyGroupNames = Object.keys(familyGroups);
  const hasMultipleFamilies = familyGroupNames.length > 1;
  const likelyFamilyCart = isLikelyFamily(cartSummary.items);

  console.log('👨‍👩‍👧‍👦 Family grouping (migration safe):', {
    totalFamilies: familyGroupNames.length,
    familyNames: familyGroupNames,
    isLikelyFamily: likelyFamilyCart,
    hasMultipleFamilies
  });

  return (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">Handlekurv</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="primary">
              {cartSummary.itemCount} student{cartSummary.itemCount !== 1 ? 'er' : ''}
            </Badge>
            {likelyFamilyCart && (
              <Badge variant="info" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                Familie
              </Badge>
            )}
          </div>
        </div>

        {/* Family overview for multiple families */}
        {hasMultipleFamilies && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center text-blue-700 text-sm">
              <Users className="w-4 h-4 mr-2" />
              <span className="font-medium">Familier i kurven:</span>
            </div>
            <div className="mt-1 text-sm text-blue-600">
              {familyGroupNames.map((familyName, index) => (
                <span key={familyName}>
                  {familyName} ({familyGroups[familyName].length})
                  {index < familyGroupNames.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Cart expiry warning */}
        {isCartExpired && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-2">
            <div className="flex items-center text-orange-700 text-sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="font-medium">Handlekurven utløper snart</span>
            </div>
            <p className="text-xs text-orange-600 mt-1">
              Fullfør bestillingen eller oppdater kurven for å forlenge tiden.
            </p>
            {onRefreshCart && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefreshCart}
                className="mt-2 text-orange-700 border-orange-300 hover:bg-orange-100"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Oppdater kurv
              </Button>
            )}
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
            <div className="flex items-center text-red-700 text-sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="font-medium">Feil</span>
            </div>
            <p className="text-xs text-red-600 mt-1">{error}</p>
          </div>
        )}

        {/* Advanced controls toggle */}
        {cartSummary.itemCount > 1 && onToggleFamilyDiscount && (
          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              <Settings className="w-3 h-3 mr-1" />
              {showAdvancedControls ? 'Skjul' : 'Vis'} avanserte kontroller
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Cart Items - Grouped by Family */}
        <div className="space-y-4">
          {familyGroupNames.map(familyName => {
            const familyMembers = familyGroups[familyName];
            const isMainFamily = familyMembers.length > 1 || familyGroupNames.length === 1;
            
            return (
              <div key={familyName} className="space-y-3">
                {/* Family header (only show if multiple families or clear family structure) */}
                {(hasMultipleFamilies || (likelyFamilyCart && familyMembers.length > 1)) && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-800">
                        Familie {familyName}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {familyMembers.length} student{familyMembers.length !== 1 ? 'er' : ''}
                      </Badge>
                    </div>
                    
                    {/* Family discount indicator */}
                    {familyMembers.some(member => member.isSecondDancerInFamily) && (
                      <Badge variant="success" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        Familierabatt
                      </Badge>
                    )}
                  </div>
                )}

                {/* Family members */}
                {familyMembers.map((item, memberIndex) => {
                  // 🔧 MIGRATION: Get names safely
                  const names = getStudentNames(item);
                  
                  return (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      {/* Student info */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-600" />
                            <h4 className="font-medium text-gray-900">
                              {names.fullName}
                            </h4>
                            <span className="text-sm text-gray-600">({item.studentAge} år)</span>
                          </div>
                          
                          {/* Family discount status */}
                          {item.isSecondDancerInFamily && (
                            <div className="flex items-center text-sm text-blue-600 mt-1">
                              <Users className="w-3 h-3 mr-1" />
                              <span>
                                Familierabatt aktivert
                                {item.familyDiscountOverride !== undefined && (
                                  <span className="text-gray-500 ml-1">
                                    ({item.familyDiscountOverride ? 'manuelt på' : 'manuelt av'})
                                  </span>
                                )}
                              </span>
                            </div>
                          )}

                          {/* Advanced family discount controls */}
                          {showAdvancedControls && cartSummary.itemCount > 1 && onToggleFamilyDiscount && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={item.isSecondDancerInFamily}
                                  onChange={() => handleToggleFamilyDiscount(item.id)}
                                  className="mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-gray-700">
                                  Familierabatt for {names.firstName}
                                </span>
                              </label>
                            </div>
                          )}
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center space-x-1">
                          {/* Duplicate button */}
                          {onDuplicateItem && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDuplicateItem(item.id)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              title="Dupliser student"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          )}

                          {/* Remove button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={removingItemId === item.id}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Fjern student"
                          >
                            {removingItemId === item.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Selected classes and schedules */}
                      <div className="space-y-2">
                        {item.selectedClasses.map(cls => {
                          const schedule = item.selectedSchedules
                            .map(scheduleId => getScheduleDetails(scheduleId))
                            .find(s => s?.danceClassId === cls.$id);

                          return (
                            <div key={cls.$id} className="bg-gray-50 rounded p-2 text-sm">
                              <div className="font-medium text-gray-900">{cls.name}</div>
                              {schedule && (
                                <div className="flex items-center justify-between text-gray-600 mt-1">
                                  <div className="flex items-center space-x-3">
                                    <div className="flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {schedule.day} {schedule.startTime}-{schedule.endTime}
                                    </div>
                                    {schedule.room && (
                                      <div className="flex items-center">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {schedule.room}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Pricing for this student */}
                      <div className="pt-2 border-t space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Pakke:</span>
                          <span>{item.pricing?.packageName || 'Ukjent pakke'}</span>
                        </div>
                        {item.pricing?.discount > 0 && (
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Opprinnelig:</span>
                            <span className="line-through">
                              {formatPrice(item.pricing.originalPrice || 0)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between font-medium">
                          <span>Pris:</span>
                          <span className="text-purple-600">
                            {formatPrice(item.pricing?.total || 0)}
                          </span>
                        </div>
                        {item.pricing?.discount > 0 && (
                          <div className="flex items-center text-sm text-green-600">
                            <Tag className="w-3 h-3 mr-1" />
                            Spart: {formatPrice(item.pricing.discount)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="border-t pt-4 space-y-2">
          {cartSummary.totalDiscount > 0 && (
            <>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Opprinnelig pris:</span>
                <span className="line-through">{formatPrice(cartSummary.originalTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>Total rabatt:</span>
                <span>-{formatPrice(cartSummary.totalDiscount)}</span>
              </div>
            </>
          )}
          
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Totalt:</span>
            <span>{formatPrice(cartSummary.total)}</span>
          </div>
        </div>

        {/* Family discount info */}
        {cartSummary.items.some(item => item.isSecondDancerInFamily) && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center text-blue-700 text-sm">
              <Users className="w-4 h-4 mr-2" />
              <span className="font-medium">Familierabatt aktivert!</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Rabatt på alle pakker for danser nr. 2+ (15% for 1 klasse, 30% for 2 klasser, 50% for 3+ klasser)
            </p>
          </div>
        )}

        {/* Security warning for excessive duplications */}
        {cartSummary.items.filter(item => {
          const names = getStudentNames(item);
          return names.lastName.includes('(kopi)') || names.firstName.includes('(kopi)');
        }).length > 2 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center text-orange-700 text-sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="font-medium">Mange dupliseringer oppdaget</span>
            </div>
            <p className="text-xs text-orange-600 mt-1">
              Vi kan be om dokumentasjon for familiemedlemskap ved bestilling.
            </p>
          </div>
        )}
                  
        {/* Checkout button */}
        <Button 
          onClick={onCheckout}
          disabled={isProcessing || isCartExpired}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
          size="lg"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Behandler...
            </>
          ) : isCartExpired ? (
            'Handlekurv utløpt'
          ) : (
            'Gå til kassen'
          )}
        </Button>

        {/* Additional info */}
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>Prisene gjelder per halvår</p>
          <p>Sikker betaling med Vipps</p>
          {likelyFamilyCart && (
            <p className="text-blue-600">
              👨‍👩‍👧‍👦 Familierabatt aktiveres automatisk for familiemedlemmer
            </p>
          )}
          {cartSummary.itemCount > 1 && (
            <p className="text-blue-600">
              💡 Tips: Bruk dupliser-knappen for søsken med samme klasser
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};